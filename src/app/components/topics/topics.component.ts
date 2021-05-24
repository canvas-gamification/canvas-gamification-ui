import {Component, OnInit} from '@angular/core';
import {CategoryService} from '@app/_services/api/category.service';
import {Category} from '@app/_models';
import {faCaretDown, faCaretRight} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-topics',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
    title = 'Topics';
    subtitle = 'A comprehensive list of all the topics covered in this system!';
    categories: Category[];
    topLevelCategories: Category[];
    expanded: unknown = {};
    subcats: { [index: string]: Category[] } = {};

    faCaretRight = faCaretRight;
    faCaretDown = faCaretDown;

    constructor(public categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.categoryService
            .getCategories()
            .subscribe((categories) => {
                this.topLevelCategories = categories.filter(c => c.parent == null);
                this.categories = categories;
            });
    }

    toggleChildTopics(category: Category): void {
        this.expanded[category.name] = !this.expanded[category.name];
        this.subcats[category.name] = this.categories.filter(c => c.parent === category.pk);
    }
}
