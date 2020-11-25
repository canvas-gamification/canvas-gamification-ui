import {Component, OnInit} from '@angular/core';
import {ConceptMapGraph} from './concept-map-graph';


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

    let adj: {};

    if (this.parentNode === 'Basics') {
      adj = {
        Variables: ['Statements', 'Data\nTypes', 'Constants'],
        Statements: ['Arithmetic\nOperators'],
        'Data\nTypes': ['Arithmetic\nOperators', 'Simple\nCalculation\nPrograms', 'Casting'],
        Constants: ['Simple\nCalculation\nPrograms'],
        'Arithmetic\nOperators': ['Simple\nCalculation\nPrograms'],
        Casting: [],
        'Simple\nCalculation\nPrograms': []
      };
    } else {
      adj = {
        Basics: ['Conditionals', 'Pre-Defined\nClasses'],
        'Pre-Defined\nClasses': ['Object-Oriented\nPrograming'],
        Conditionals: ['Pre-Defined\nClasses', 'Loops', 'Methods'],
        Loops: ['Methods', 'Arrays'],
        Methods: ['Object-Oriented\nPrograming'],
        Arrays: ['Object-Oriented\nPrograming'],
        'Object-Oriented\nPrograming': []
      };
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
