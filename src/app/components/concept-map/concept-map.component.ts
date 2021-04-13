import {Component, Input, OnInit} from '@angular/core';
import {ConceptMapGraph} from './concept-map-graph';
import {Category, Course, User} from '@app/_models';
import {CategoryService} from '@app/_services/api/category.service';
import {MessageService} from '@app/_services/message.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '@app/_services/api/authentication';

@Component({
    selector: 'app-concept-map',
    templateUrl: './concept-map.component.html',
    styleUrls: ['./concept-map.component.scss']
})
export class ConceptMapComponent implements OnInit {
    user: User;
    rawCategories: Category[];
    parentNode: number = null;
    conceptMapGraph: ConceptMapGraph;

    @Input() currCourse: Course;

    constructor(private categoryService: CategoryService,
                private authenticationService: AuthenticationService,
                private messageService: MessageService,
                private router: Router) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(categories => {
            this.rawCategories = categories;
            this.conceptMapGraph = new ConceptMapGraph((cellId) => {
                this.parentNode = cellId;
                if (!this.isTopLevel(cellId)) {
                    this.router.navigate(['course', this.currCourse.id, 'category', cellId]);
                }
                this.renderGraph();
            });
            this.renderGraph();
        });
    }

    renderGraph() {
        const adj = [];
        this.rawCategories.filter(category => category.parent === this.parentNode)
            .forEach(category => {
                adj.push(category);
            });

        if (!adj) {
            this.parentNode = null;
            this.renderGraph();
            return;
        }

        this.conceptMapGraph.buildGraphFromAdjacencyList(adj);
    }

    reset() {
        this.parentNode = null;
        this.renderGraph();
    }

    update() {
        this.renderGraph();
    }

    isTopLevel(categoryId: number) {
        return this.rawCategories.find(category => category.pk === categoryId).parent === null;
    }
}
