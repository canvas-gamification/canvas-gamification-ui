import {AfterContentInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core'
import {CategoryStatsService} from "@app/admin/_services/category-stats.service"
import {NestedCategories} from "@app/_models"
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'

@Component({
    selector: 'app-category-stats',
    templateUrl: './category-stats.component.html',
    styleUrls: ['./category-stats.component.scss']
})
export class CategoryStatsComponent implements OnInit, AfterContentInit {
    categoryStatsData!: NestedCategories[]
    categoryStatsDataHeader!: string[]

    constructor(
        private categoryStatsService: CategoryStatsService,
        private changeDetector: ChangeDetectorRef,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
    ) {
    }

    ngOnInit(): void {
        this.categoryStatsService.getCategoryStats().subscribe(categoryStatsData => {
            this.categoryStatsData = categoryStatsData
            this.categoryStatsDataHeader = Object.keys(categoryStatsData[0])
        })
    }

    ngAfterContentInit(): void {
        this.changeDetector.detectChanges()
    }

    openCategoryStatsDialog(title: string, content: PolymorpheusContent<TuiDialogContext>): void {
        this.dialogService.open(content, {
            closeable: false,
            size: 'l',
            label: title
        }).subscribe()
    }
}
