import {Component, Input, OnInit} from '@angular/core'
import {ConceptMapGraph} from './concept-map-graph'
import {ActionStatus, ActionType, ActionVerb, Category, Course} from '@app/_models'
import {CategoryService} from '@app/_services/api/category.service'
import {Router} from '@angular/router'
import {UserActionsService} from "@app/_services/api/user-actions.service"
import {ParentNodeService} from "@app/_services/parent-node-service"

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

    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private userActionsService: UserActionsService,
        private parentNodeService: ParentNodeService
    ) {
        this.parentNode = this.parentNodeService.getParentNode()
    }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(categories => {
            this.rawCategories = categories
            this.conceptMapGraph = new ConceptMapGraph((cellId) => {
                const isTopLevel = this.isTopLevel(cellId)
                this.logConceptClick(cellId, isTopLevel)
                this.parentNode = cellId
                if (!isTopLevel) {
                    this.router.navigate(
                        ['course', this.currCourse.id, 'practice', 'category', cellId]
                        , {queryParams: {difficulty: 'EASY'}}
                    ).then()
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
        this.parentNodeName = this.parentNode
            ? this.rawCategories.find(category => category.pk === this.parentNode).full_name
            : null
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
        this.logConceptClick(null, false)
        this.parentNode = null
        this.renderGraph()
    }

    /**
     * Returns a boolean value indicating whether the category passed
     * to the function is a top level category or not
     * @param categoryId - unique category ID to be checked
     */
    isTopLevel(categoryId: number): boolean {
        return this.rawCategories.find(category => category.pk === categoryId).parent === null
    }

    logConceptClick(categoryId: number, isTopLevel: boolean) {
        if (this.parentNode !== categoryId)
            this.parentNodeService.setParentNode(categoryId)
        else this.parentNodeService.setParentNode(null)
        this.userActionsService.createCustomAction({
            description: 'User selected a category on the concept map',
            object_type: ActionType.BUTTON,
            status: ActionStatus.COMPLETE,
            verb: ActionVerb.CLICKED,
            data: {
                categoryId,
                isTopLevel,
            }
        }).subscribe()
    }
}
