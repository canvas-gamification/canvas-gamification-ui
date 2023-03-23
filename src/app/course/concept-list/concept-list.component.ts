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

@Component({
    selector: 'app-concept-list',
    templateUrl: './concept-list.component.html',
    styleUrls: ['./concept-list.component.scss']
})
export class ConceptListComponent implements OnInit {
    categories: Category[]
    nestedCategories: NestedCategories[]
    difficulties: Difficulty[]
    tableColumns: ['name', 'practice', ...Array<string>] = ['name', 'practice']

    @Input() currCourse: Course

    constructor(
        private categoryService: CategoryService,
        private difficultyService: DifficultyService,
        private router: Router
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
            this.tableColumns = ['name', 'practice', ...difficulties.map(difficulty => difficulty[0])]
        })
    }

    openPracticePage(category: Category) {
        console.log(category.name)
        console.log(category.parent)
        this.router.navigate(
            ['course', this.currCourse.id, 'practice', 'category', category.parent]
            , {queryParams: {difficulty: 'EASY'}}
        ).then()
    }
}
