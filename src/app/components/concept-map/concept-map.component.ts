import {Component, OnInit} from '@angular/core';
import {ConceptMapGraph} from './concept-map-graph';
import {data} from './data';

@Component({
  selector: 'app-concept-map',
  templateUrl: './concept-map.component.html',
  styleUrls: ['./concept-map.component.css']
})
export class ConceptMapComponent implements OnInit {

  parentNode: string;
  conceptMapGraph: ConceptMapGraph;

  renderGraph() {
    console.log(this.parentNode);

    let adj = data.default;
    if (this.parentNode in data) {
      adj = data[this.parentNode];
    }

    this.conceptMapGraph.buildGraphFromAdjacencyList(adj);
  }

  constructor() {
  }

  ngOnInit() {
    this.conceptMapGraph = new ConceptMapGraph((cellId) => {
      this.parentNode = cellId;
      this.renderGraph();
    });
    this.renderGraph();
  }

  reset() {
    this.parentNode = '';
    this.renderGraph();
  }
}
