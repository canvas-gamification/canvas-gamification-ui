import {Component, Input, OnInit} from '@angular/core';
import {ConceptMapGraph} from './concept-map-graph';
import {Category, Course} from '@app/_models';
import {CategoryService} from '@app/_services/api/category.service';
import {ToastrService} from "ngx-toastr";
import {Router} from '@angular/router';

@Component({
    selector: 'app-concept-map',
    templateUrl: './concept-map.component.html',
    styleUrls: ['./concept-map.component.scss']
})
export class ConceptMapComponent implements OnInit {
    rawCategories: Category[];
    parentNode = 0;
    conceptMapGraph: ConceptMapGraph;

    @Input() currCourse: Course;

    constructor(private categoryService: CategoryService,
                private toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(categories => {
            this.rawCategories = categories;
            this.conceptMapGraph = new ConceptMapGraph((cellId) => {
                this.parentNode = cellId;
                if (!this.isTopLevel(cellId)) {
                    this.router.navigate(['course', this.currCourse.id, 'category', cellId]).then();
                }
                this.renderGraph();
            });
            this.renderGraph();
            this.reset();
        });
    }

    renderGraph(): void {
        const adj: Category[] = [];
        this.rawCategories.filter(category => category.parent === this.parentNode)
            .forEach(category => {
                adj.push(category);
            });
        this.conceptMapGraph.buildGraphFromAdjacencyList(adj);
    }

    reset(): void {
        this.parentNode = null;
        this.renderGraph();
    }

    isTopLevel(categoryId: number): boolean {
        return this.rawCategories.find(category => category.pk === categoryId).parent === null;
    }
}
