import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '@app/_services/api/category.service';
import {Category} from '@app/_models';

@Component({
    selector: 'app-admin-user-stats',
    templateUrl: './admin-user-stats.component.html',
    styleUrls: ['./admin-user-stats.component.scss']
})
export class AdminUserStatsComponent implements OnInit {
    @Input() userData;
    masterCategories: Category[];

    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categoryService
            .getCategories()
            .subscribe((categories) => {
                this.masterCategories = categories;
            });
    }

}
