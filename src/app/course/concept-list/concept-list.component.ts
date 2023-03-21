import {Component, Input, OnInit} from '@angular/core'
import {CategoryService} from "@app/_services/api/category.service"
import {Category, Course, NestedCategories} from "@app/_models"
import {Difficulty} from "@app/_models/difficulty"
import {DifficultyService} from "@app/problems/_services/difficulty.service"

@Component({
    selector: 'app-concept-list',
    templateUrl: './concept-list.component.html',
    styleUrls: ['./concept-list.component.scss']
})
export class ConceptListComponent implements OnInit {
    categories: Category[]
    nestedCategories: NestedCategories[]
    difficulties: Difficulty[]
    tableColumns: ['name', ...Array<string>] = ['name']

    @Input() currCourse: Course

    constructor(
        private categoryService: CategoryService,
        private difficultyService: DifficultyService
    ) {
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
            this.tableColumns = ['name', ...difficulties.map(difficulty => difficulty[0])]
        })
    }

}
