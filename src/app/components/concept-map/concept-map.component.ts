import {Component, OnInit} from '@angular/core';
import {ConceptMapGraph} from './concept-map-graph';
import {Category} from '../../../models/category';
import {CategoryService} from '../../services/api/category.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-concept-map',
  templateUrl: './concept-map.component.html',
  styleUrls: ['./concept-map.component.css']
})
export class ConceptMapComponent implements OnInit {

  userId: number;
  rawCategories: Category[];
  parentNode: number = null;
  conceptMapGraph: ConceptMapGraph;

  renderGraph() {
    const adj = [];
    for (const category of this.rawCategories) {
      if (category.parent === this.parentNode) {
        adj.push(category);
      }
    }

    if (adj.length === 0) {
      this.parentNode = null;
      this.renderGraph();
      return;
    }

    this.conceptMapGraph.buildGraphFromAdjacencyList(adj);
  }

  constructor(private categoryService: CategoryService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.rawCategories = categories;
      this.conceptMapGraph = new ConceptMapGraph((cellId) => {
        this.parentNode = cellId;
        this.renderGraph();
      });
      this.renderGraph();
    });
  }

  reset() {
    this.parentNode = null;
    this.renderGraph();
  }

  update() {
    this.renderGraph();
  }
}
