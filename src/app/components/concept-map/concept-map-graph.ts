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
      gridSize: 20,
      interactive: false,
    });

    this.paper.on('cell:pointerdown', (cellView, evt, x, y) => {
        if (cellView.model.attributes.type === 'standard.Ellipse') {
          onclick(cellView.model.id);
        }
      });
  }

  makeElement(id, label) {
    const maxLineLength = Math.max(...label.split('\n').map(x => x.length));

    const letterSize = 16;
    const width = 1.5 * (letterSize * (0.6 * maxLineLength + 1));
    const height = 1.5 * ((label.split('\n').length + 1) * letterSize);

    return new joint.shapes.standard.Ellipse({
      id,
      size: {width, height},
      strokeDasharray: '10,2',
      fill: '#42f575',
      attrs: {
        label: {
          text: label,
          'font-size': letterSize,
          'font-family': 'monospace',
          cursor: 'pointer',
        },
        body: {
          width, height,
          rx: 10, ry: 10,
          stroke: '#000000',
          cursor: 'pointer',
          strokeDasharray: '10,2',
          fill: '#42f575',
        },
      }
    });
  }

  makeLink(parentElementLabel, childElementLabel) {
    return new joint.shapes.standard.Link({
      source: {
        id: parentElementLabel,
      },
      target: {
        id: childElementLabel,
      },
      router: {
        name: 'manhattan',
        args: {
          step: 10,
          padding: 20,
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
          stroke: 'black',
          cursor: 'default',
          targetMarker: {
            type: 'path',
            d: 'M 10 -5 0 0 10 5',
            fill: 'rgba(0,0,0,0)',
            'stroke-width': 1.75
          }
        },
        wrapper: {
          cursor: 'default'
        }
      },
    });
  }

  makeCellsFromAdjacencyList(adjacencyList) {

    const elements = [];
    const links = [];

    _.each(adjacencyList, (category) => {
      const label = category.name.replaceAll(' ', '\n') + '\n\nAverage Success:\n' + category.avgSuccess + '%';
      elements.push(this.makeElement(category.pk, label));

      _.each(category.nextCategories, (childElementId) => {
        links.push(this.makeLink(category.pk, childElementId));
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
      nodeSep: 40,
      edgeSep: 40,
      ranker: 'longest-path',
      rankDir: 'LR',
    });
  }
}
