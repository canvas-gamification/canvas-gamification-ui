import {Component, Input, OnInit} from '@angular/core';
import {CategoryStats} from '@app/_models/category_stats';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-category-stats',
    templateUrl: './category-stats.component.html',
    styleUrls: ['./category-stats.component.scss']
})
export class CategoryStatsComponent implements OnInit {
    @Input() categoryStatData: CategoryStats[];
    expanded: {} = {};
    faCaretRight = faCaretRight;
    faCaretDown = faCaretDown;

    constructor() {}

    ngOnInit(): void {
    }

    toggleChildTopics(categoryStat: CategoryStats): void {
        this.expanded[categoryStat.category.name] = !this.expanded[categoryStat.category.name];
    }

}
