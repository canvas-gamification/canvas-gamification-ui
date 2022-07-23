import {Component, Inject, Injector, Input, OnInit} from '@angular/core'
import {ConceptMapGraph} from './concept-map-graph'
import {Category, Course} from '@app/_models'
import {CategoryService} from '@app/_services/api/category.service'
import {Router} from '@angular/router'

@Component({
    selector: 'app-concept-map',
    templateUrl: './concept-map.component.html',
    styleUrls: ['./concept-map.component.scss']
})
export class ConceptMapComponent implements OnInit {
    rawCategories: Category[]
    parentNode: number = null
    parentNodeName: string = null
    conceptMapGraph: ConceptMapGraph

    @Input() currCourse: Course

    constructor(private categoryService: CategoryService,
                private router: Router,
                @Inject(Injector) private readonly injector: Injector) {
    }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(categories => {
            this.rawCategories = categories
            this.conceptMapGraph = new ConceptMapGraph((cellId) => {
                this.parentNode = cellId
                if (!this.isTopLevel(cellId)) {
                    this.router.navigate(['course', this.currCourse.id, 'practice', 'category', cellId]).then()
                } else {
                    this.renderGraph()
                }
            })
            this.renderGraph()
        })
    }

    /**
     * Renders the concept map using the categories fetched from the API
     */
    renderGraph(): void {
        const adj: Category[] = []
        this.parentNodeName = this.parentNode ? this.rawCategories.find(category => category.pk === this.parentNode).full_name : null
        this.rawCategories.filter(category => category.parent === this.parentNode)
            .forEach(category => {
                adj.push(category)
            })

        if (!adj) {
            this.parentNode = null
            this.parentNodeName = null
            this.renderGraph()
            return
        }

        this.conceptMapGraph.buildGraphFromAdjacencyList(adj)
    }

    /**
     * Resets the graph to the top level and re-renders the graph
     */
    reset(): void {
        this.parentNode = null
        this.renderGraph()
    }

    /**
     * Returns a boolean value indicating whether the category passed to the function is a top level category or not
     * @param categoryId - unique category ID to be checked
     */
    isTopLevel(categoryId: number): boolean {
        return this.rawCategories.find(category => category.pk === categoryId).parent === null
    }
}
