import {Component, OnInit} from '@angular/core';
import {CategoryService} from '@app/_services/api/category.service';
import {Category} from '@app/_models';
import {faCaretDown, faCaretRight} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
    title = 'Categories & Sub-Categories';
    subtitle = 'A complete listing of all categories with their sub categories';
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
                this.categories = categories;
            });
    }

}
