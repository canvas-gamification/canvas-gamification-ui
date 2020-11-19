import {Component, OnInit} from '@angular/core';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
import dagre from 'dagre';
import graphlib from 'graphlib';
import * as joint from 'jointjs';

@Component({
  selector: 'app-concept-map',
  templateUrl: './concept-map.component.html',
  styleUrls: ['./concept-map.component.css']
})
export class ConceptMapComponent implements OnInit {

  makeElement(label) {
    const maxLineLength = Math.max(...label.split('\n').map(x => x.length));

    const letterSize = 8;
    const width = 2 * (letterSize * (0.6 * maxLineLength + 1));
    const height = 2 * ((label.split('\n').length + 1) * letterSize);

    return new joint.shapes.basic.Rect({
      id: label,
      size: {width, height},
      attrs: {
        text: {text: label, 'font-size': letterSize, 'font-family': 'monospace'},
        rect: {
          width, height,
          rx: 5, ry: 5,
          stroke: '#555'
        }
      }
    });
  }

  makeLink(parentElementLabel, childElementLabel) {
    return new joint.dia.Link({
      source: {id: parentElementLabel},
      target: {id: childElementLabel},
      attrs: {'.marker-target': {d: 'M 4 0 L 0 2 L 4 4 z'}},
      smooth: true
    });
  }

  buildGraphFromAdjacencyList(adjacencyList) {

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

  constructor() {
  }

  ngOnInit() {
    const adj = {
      Basics: ['Conditionals', 'Pre-Defined\nClasses'],
      'Pre-Defined\nClasses': ['Object-Oriented\nPrograming'],
      Conditionals: ['Pre-Defined\nClasses', 'Loops', 'Methods'],
      Loops: ['Methods', 'Arrays'],
      Methods: ['Object-Oriented\nPrograming'],
      Arrays: ['Object-Oriented\nPrograming'],
      'Object-Oriented\nPrograming': []
    };

    const graph = new joint.dia.Graph();

    const paper = new joint.dia.Paper({
      el: jQuery('#paper'),
      width: 2000,
      height: 2000,
      model: graph,
      gridSize: 1
    });

    const cells = this.buildGraphFromAdjacencyList(adj);
    graph.resetCells(cells);
    joint.layout.DirectedGraph.layout(graph, {
      dagre,
      graphlib,
      setLinkVertices: false,
      nodeSep: 50,
      edgeSep: 80,
      rankDir: 'LR'
    });
  }
}
