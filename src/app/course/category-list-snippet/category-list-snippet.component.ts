import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '@app/_services/api/category.service';
import {Category} from '@app/_models';

@Component({
    selector: 'app-category-list-snippet',
    templateUrl: './category-list-snippet.component.html',
    styleUrls: ['./category-list-snippet.component.scss']
})
export class CategoryListSnippetComponent implements OnInit {
    @Input() categoryList: [{
        categories: string,
    }];

    title = 'Categories & Sub-Categories';
    subtitle = 'A complete listing of all categories with their sub categories';
    categories: Category[];
    expanded: unknown = {};
    subcats: { [index: string]: Category[] } = {};

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
