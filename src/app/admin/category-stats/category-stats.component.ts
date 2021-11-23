import {AfterContentInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {CategoryStatsService} from "@app/admin/_services/category-stats.service";
import {NestedCategories} from "@app/_models";
import {TuiDialogService} from "@taiga-ui/core";

@Component({
    selector: 'app-category-stats',
    templateUrl: './category-stats.component.html',
    styleUrls: ['./category-stats.component.scss']
})
export class CategoryStatsComponent implements OnInit, AfterContentInit {
    categoryStatsData!: NestedCategories[];
    categoryStatsDataHeader!: string[];
    categoryStatsSearch = '';

    readonly matchStatsName = (nestedCategory: NestedCategories, search: string): boolean => {
        if (search !== '') return nestedCategory.category.name.includes(search);
        else return true;
    }

    constructor(private categoryStatsService: CategoryStatsService,
                private changeDetector: ChangeDetectorRef,
                @Inject(TuiDialogService) private readonly dialogService: TuiDialogService) {
    }

    ngOnInit(): void {
        this.categoryStatsService.getCategoryStats().subscribe(categoryStatsData => {
            this.categoryStatsData = categoryStatsData;
            this.categoryStatsDataHeader = Object.keys(categoryStatsData[0]);
        });
    }

    ngAfterContentInit(): void {
        this.changeDetector.detectChanges();
    }

    openCategoryStatsDialog(categoryStats: NestedCategories): void {
        this.dialogService.open(categoryStats.children.map(categoryStatChild => categoryStatChild.category.name).join()).subscribe();
    }
}
