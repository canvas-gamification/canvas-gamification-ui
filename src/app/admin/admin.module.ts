import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {QuestionCountComponent} from './question-count/question-count.component'
import {CategoryStatsComponent} from './category-stats/category-stats.component'
import {TuiTableModule} from '@taiga-ui/addon-table'
import {
    TuiDataListWrapperModule,
    TuiHighlightModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiInputTimeModule,
    TuiIslandModule,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiTabsModule
} from '@taiga-ui/kit'
import {FormsModule} from '@angular/forms'
import {
    TuiButtonModule, TuiDataListModule,
    TuiLoaderModule,
    TuiScrollbarModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core'
import {TuiRingChartModule} from '@taiga-ui/addon-charts'
import {TuiFilterPipeModule} from '@taiga-ui/cdk'
import {CoursesComponent} from './courses/courses.component'
import {SidebarModule} from '@app/components/sidebar/sidebar.module'
import {
    ExportPageViewComponentComponent
} from './export/export-page-view-component/export-page-view-component.component'
import {ExportSnippetComponent} from './export/export-snippet/export-snippet.component'
import {AdminRoutingModule} from "@app/admin/admin-routing.module"


@NgModule({
    declarations: [
        CategoryStatsComponent,
        CoursesComponent,
        ExportPageViewComponentComponent,
        ExportSnippetComponent,
        QuestionCountComponent
    ],
    exports: [
        CategoryStatsComponent,
        CoursesComponent,
        QuestionCountComponent,
    ],
    imports: [
        AdminRoutingModule,
        CommonModule,
        FormsModule,
        SidebarModule,
        TuiButtonModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiFilterPipeModule,
        TuiHighlightModule,
        TuiInputDateModule,
        TuiInputModule,
        TuiInputNumberModule,
        TuiInputTimeModule,
        TuiIslandModule,
        TuiLoaderModule,
        TuiMultiSelectModule,
        TuiRingChartModule,
        TuiScrollbarModule,
        TuiSelectModule,
        TuiTableModule,
        TuiTabsModule,
        TuiTextfieldControllerModule,
    ]
})
export class AdminModule {
}
