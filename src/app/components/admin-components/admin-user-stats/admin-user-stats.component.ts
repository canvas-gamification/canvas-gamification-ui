import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '@app/_services/api/category.service';
import {Category, UserStats} from '@app/_models';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-admin-user-stats',
    templateUrl: './admin-user-stats.component.html',
    styleUrls: ['./admin-user-stats.component.scss']
})
export class AdminUserStatsComponent implements OnInit {
    @Input() userData: UserStats[];
    masterCategories: Category[];
    expanded: {} = {};
    faCaretRight = faCaretRight;
    faCaretDown = faCaretDown;


    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categoryService
            .getCategories()
            .subscribe((categories) => {
                this.masterCategories = categories;
            });
    }

    toggleChildTopics(user: UserStats): void {
        this.expanded[user.pk] = !this.expanded[user.pk];
    }

}
