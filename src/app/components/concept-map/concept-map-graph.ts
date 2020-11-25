import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
import dagre from 'dagre';
import graphlib from 'graphlib';
import * as joint from 'jointjs';

export class ConceptMapGraph {
  graph;
  paper;

  constructor(onclick) {
    this.graph = new joint.dia.Graph();

    this.paper = new joint.dia.Paper({
      el: jQuery('#paper'),
      width: 2000,
      height: 2000,
      model: this.graph,
      gridSize: 1,
      interactive: false,
    });

    this.paper.on('cell:pointerdown', (cellView, evt, x, y) => {
        if (cellView.model.attributes.type === 'basic.Rect') {
          onclick(cellView.model.id);
        }
      }
    );
  }

  makeElement(label) {
    const maxLineLength = Math.max(...label.split('\n').map(x => x.length));

    const letterSize = 16;
    const width = 2 * (letterSize * (0.6 * maxLineLength + 1));
    const height = 2 * ((label.split('\n').length + 1) * letterSize);

    return new joint.shapes.basic.Rect({
      id: label,
      size: {width, height},
      attrs: {
        text: {
          text: label,
          'font-size': letterSize,
          'font-family': 'monospace',
          cursor: 'pointer',
        },
        rect: {
          width, height,
          rx: 10, ry: 10,
          stroke: '#555',
          cursor: 'pointer',
        },
      }
    });
  }

  makeLink(parentElementLabel, childElementLabel) {
    return new joint.shapes.standard.Link({
      source: {
        id: parentElementLabel,
        anchor: {
          name: 'midSide'
        }
      },
      target: {
        id: childElementLabel,
        anchor: {
          name: 'midSide'
        }
      },
      router: {
        name: 'normal',
        args: {
          padding: 20,
        }
      },
      attrs: {
        line: {
          stroke: 'black',
          cursor: 'default',
        },
        wrapper: {
          cursor: 'default'
        }
      },
      smooth: true,
    });
  }

  makeCellsFromAdjacencyList(adjacencyList) {

    const elements = [];
    const links = [];

    _.each(adjacencyList, (edges, parentElementLabel) => {
      elements.push(this.makeElement(parentElementLabel));

      _.each(edges, (childElementLabel) => {
        links.push(this.makeLink(parentElementLabel, childElementLabel));
      });
    });

    return elements.concat(links);
  }

  buildGraphFromAdjacencyList(adj) {
    const cells = this.makeCellsFromAdjacencyList(adj);
    this.graph.resetCells(cells);
    joint.layout.DirectedGraph.layout(this.graph, {
      dagre,
      graphlib,
      setLinkVertices: false,
      nodeSep: 80,
      edgeSep: 80,
      rankDir: 'LR'
    });
  }
}
