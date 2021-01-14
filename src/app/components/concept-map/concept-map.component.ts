import {Component, OnInit} from '@angular/core';
import {ConceptMapGraph} from './concept-map-graph';
import {Category} from '../../../models/category';
import {CategoryService} from '../../services/api/category.service';
import {MessageService} from '../../services/message.service';
import {Router} from '@angular/router';

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

  constructor(private categoryService: CategoryService, private messageService: MessageService, private router: Router) {
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.rawCategories = categories;
      this.conceptMapGraph = new ConceptMapGraph((cellId) => {
        this.parentNode = cellId;
        if (!this.isTopLevel(cellId)) {
          this.router.navigate(['user-stats', {categoryId: cellId, userId: this.userId}]);
        }
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

  isTopLevel(categoryId: number) {
    for (const category of this.rawCategories) {
      if (categoryId === category.pk) {
        return category.parent === null;
      }
    }
  }
}
