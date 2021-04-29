import {Component, Input, OnInit} from '@angular/core';
import {CategoryStats} from '@app/_models/category_stats';
import {Category} from '@app/_models';

@Component({
    selector: 'app-category-stats',
    templateUrl: './category-stats.component.html',
    styleUrls: ['./category-stats.component.scss']
})
export class CategoryStatsComponent implements OnInit {
    @Input() categoryStatData: CategoryStats[];
    expanded: {} = {};

    constructor() {}

    ngOnInit(): void {
    }

    toggleChildTopics(category: Category): void {
        this.expanded[category.name] = !this.expanded[category.name];
    }

}
