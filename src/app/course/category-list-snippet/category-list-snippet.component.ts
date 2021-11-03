import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '@app/_services/api/category.service';
import {Category} from '@app/_models';
import {MatTableDataSource} from "@angular/material/table";
import {Sort} from "@angular/material/sort";
import {Subject} from "rxjs";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-category-list-snippet',
    templateUrl: './category-list-snippet.component.html',
    styleUrls: ['./category-list-snippet.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class CategoryListSnippetComponent implements OnInit {
    @Input() categoryList: [{
        categories: string,
    }];

    categoriesList: Category[];
    categoriesSource : MatTableDataSource<Category>;
    expanded: unknown = {};
    displayedColumns: string[] = ['pk', 'name', 'parent'];
    expandedElement: Category | null;

    // Sorting
    ordering: string;
    //Filtering
    filterQueryString;
    paramChanged: Subject<{
        ordering: string
    }> = new Subject<{
        ordering: string
    }>();

    constructor(public categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.categoryService
            .getCategories()
            .subscribe((categories) => {
                this.categoriesList = categories;
                this.categoriesSource = new MatTableDataSource(this.categoriesList);
            });
    }

    /**
     * Update the current view of the course-dashboard.
     */
    update(): void {
        const options = {
            ...this.filterQueryString,
            ordering: this.ordering,
        };
        this.paramChanged.next(options);
    }

    /**
     * Helper method for sorting the canvascourseregistration objects.
     * @param sort - The current sort state.
     */
    sortData(sort: Sort): void {
        if (sort.direction === 'asc') {
            this.ordering = sort.active;
        } else if (sort.direction === 'desc') {
            this.ordering = '-' + sort.active;
        } else {
            this.ordering = '';
        }
        this.update();
    }
}
