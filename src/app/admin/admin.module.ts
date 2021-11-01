import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionCountComponent} from './question-count/question-count.component';
import {CategoryStatsComponent} from './category-stats/category-stats.component';
import {TuiTableModule} from "@taiga-ui/addon-table";
import {
    TuiDataListWrapperModule,
    TuiHighlightModule,
    TuiInputModule,
    TuiIslandModule,
    TuiSelectModule,
    TuiTabsModule
} from "@taiga-ui/kit";
import {FormsModule} from "@angular/forms";
import {TuiLoaderModule, TuiScrollbarModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TuiRingChartModule} from "@taiga-ui/addon-charts";
import {TuiFilterPipeModule} from "@taiga-ui/cdk";
import {ViewCoursesComponent} from './view-courses/view-courses.component';


@NgModule({
    declarations: [QuestionCountComponent, CategoryStatsComponent, ViewCoursesComponent],
    exports: [
        QuestionCountComponent,
        CategoryStatsComponent,
        ViewCoursesComponent
    ],
    imports: [
        CommonModule,
        TuiTableModule,
        TuiSelectModule,
        TuiDataListWrapperModule,
        FormsModule,
        TuiLoaderModule,
        TuiIslandModule,
        TuiInputModule,
        TuiHighlightModule,
        TuiRingChartModule,
        TuiFilterPipeModule,
        TuiTabsModule,
        TuiTextfieldControllerModule,
        TuiScrollbarModule
    ]
})
export class AdminModule {
}
