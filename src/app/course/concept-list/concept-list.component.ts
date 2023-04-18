import {Component, Input, OnInit} from '@angular/core'
import {CategoryService} from "@app/_services/api/category.service"
import {
    Category,
    Course,
    NestedCategories
} from "@app/_models"
import {Difficulty} from "@app/_models/difficulty"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {Router} from "@angular/router"
import {ParentNodeService} from "@app/_services/parent-node-service"

@Component({
    selector: 'app-concept-list',
    templateUrl: './concept-list.component.html',
    styleUrls: ['./concept-list.component.scss']
})
export class ConceptListComponent implements OnInit {
    categories: Category[]
    nestedCategories: NestedCategories[]
    difficulties: Difficulty[]
    tableColumns = ['name', 'practice']
    parentNode: number = null

    @Input() currCourse: Course

    constructor(
        private categoryService: CategoryService,
        private difficultyService: DifficultyService,
        private parentNodeService: ParentNodeService,
        private router: Router
    ) {
        this.parentNode = this.parentNodeService.getParentNode()
    }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories
            this.nestedCategories = categories.reduce((previous, category) => {
                if (category.parent) return previous
                return [...previous, {
                    category,
                    children: categories.filter(
                        nestedCategory => nestedCategory.parent === category.pk
                    ).map(nestedCategory => {
                        return {
                            category: nestedCategory,
                            children: [],
                        }
                    })
                }]
            }, [])
        })
        this.difficultyService.getDifficulties().subscribe(difficulties => {
            this.difficulties = difficulties
            this.tableColumns = ['name', 'practice', ...difficulties.map(difficulty => difficulty[0])]
        })
    }

    openPracticePage(category: Category) {
        this.router.navigate(
            ['course', this.currCourse.id, 'practice', 'category', category.pk]
            , {queryParams: {difficulty: 'EASY'}}
        ).then()
    }

    setTopLevel(pk: number) {
        if (this.parentNodeService.getParentNode() !== pk)
            this.parentNodeService.setParentNode(pk)
        else this.parentNodeService.setParentNode(null)
    }

    getTopLevel(pk: number): boolean {
        return this.parentNodeService.getParentNode() === pk
    }
}
