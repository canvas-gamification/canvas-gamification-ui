import {Component, OnInit} from '@angular/core';
import {CategoryService} from '@app/_services/api/category.service';
import {Category} from '@app/_models';

@Component({
    selector: 'app-topics',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
    topLevelCategories: Category[];
    subCategories: { [index: string]: Category[] } = {};
    tableHeaders = ['topics', 'available_questions', 'success_rate'];

    constructor(public categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.categoryService
            .getCategories()
            .subscribe((categories) => {
                this.topLevelCategories = categories.filter(c => c.parent == null);
                categories.forEach(category => {
                    if (category.parent === null) {
                        this.subCategories[category.name] = categories.filter(c => c.parent === category.pk);
                    }
                });
            });
    }
}
