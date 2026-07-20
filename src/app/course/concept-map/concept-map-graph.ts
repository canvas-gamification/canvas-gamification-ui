import * as joint from '@joint/core'
import {DirectedGraph} from '@joint/layout-directed-graph'
import {Category} from '@app/_models'

export class ConceptMapGraph {
    graph
    paper
    offsetX = 20
    offsetY = 20

    constructor(onclick: (number) => unknown) {
        this.graph = new joint.dia.Graph()

        this.paper = new joint.dia.Paper({
            el: document.getElementById('paper'),
            width: '100%',
            height: 'calc(100vh - 19rem)',
            model: this.graph,
            gridSize: 20,
            interactive: false
        })
        this.paper.translate(this.offsetX, this.offsetY)

        this.paper.on('cell:pointerdown', (cellView) => {
            if (cellView.model.attributes.type === 'standard.Ellipse') {
                // Cell ids are stored as strings (see makeElement); callers expect numeric category pks.
                onclick(Number(cellView.model.id))
            }
        })
    }

    makeElement(id: number, label: string): joint.shapes.standard.Ellipse {
        const maxLineLength = Math.max(...label.split('\n').map(x => x.length))

        const letterSize = 16
        const width = 1.3 * (letterSize * (0.6 * maxLineLength + 1))
        const height = 1.5 * ((label.split('\n').length + 1) * letterSize)

        return new joint.shapes.standard.Ellipse({
            // @joint/core 4 + @dagrejs/graphlib: graphlib stringifies node ids, and Graph#getCell
            // lookups are type-sensitive, so numeric ids break DirectedGraph.layout. Use string ids.
            id: String(id),
            size: {width, height},
            fill: 'var(--tui-background-neutral-1)',
            attrs: {
                label: {
                    text: label,
                    'font-size': letterSize,
                    'font-weight': 'bold',
                    'font-family': 'sans-serif',
                    fill: 'var(--tui-text-primary)',
                    cursor: 'pointer',
                },
                body: {
                    width, height,
                    rx: 10, ry: 10,
                    stroke: 'var(--tui-background-accent-opposite-hover)',
                    cursor: 'pointer',
                    fill: 'var(--tui-background-neutral-1)',
                },
            }
        })
    }

    makeLink(parentElementLabel: number, childElementLabel: number): joint.shapes.standard.Link {
        return new joint.shapes.standard.Link({
            source: {
                id: String(parentElementLabel),
            },
            target: {
                id: String(childElementLabel),
            },
            router: {
                name: 'manhattan',
                args: {
                    maxAllowedDirectionChange: 360,
                    perpendicular: false,
                    startDirections: ['right', 'top', 'bottom'],
                    endDirections: ['left', 'top', 'bottom']
                }
            },
            connector: {
                name: 'rounded',
            },
            attrs: {
                line: {
                    stroke: 'var(--tui-background-accent-opposite-hover)',
                    cursor: 'default',
                },
                wrapper: {
                    cursor: 'default'
                }
            },
        })
    }

    makeCellsFromAdjacencyList(adjacencyList: Category[]): joint.shapes.standard.Ellipse[] {

        const elements = []
        const links = []

        adjacencyList.forEach(category => {
            const label =
                `${category.name.replaceAll(' ', '\n')}\n\n${category.question_count} Questions`
            elements.push(this.makeElement(category.pk, label))

            category.next_category_ids.forEach(childElementId => {
                links.push(this.makeLink(category.pk, childElementId))
            })
        })

        return elements.concat(links)
    }

    buildGraphFromAdjacencyList(adj: Category[]): void {
        const cells = this.makeCellsFromAdjacencyList(adj)
        this.graph.resetCells(cells)
        const directedGraph = DirectedGraph.layout(this.graph, {
            nodeSep: 40,
            edgeSep: 40,
            ranker: 'longest-path',
            rankDir: 'LR',
        })
        this.paper.svg.style.width = `${directedGraph.width + this.offsetX * 2}px`
        this.paper.svg.style.height = `${directedGraph.height + this.offsetY * 2}px`
    }
}
