import { TuiCardLarge } from "@taiga-ui/layout";
import { TuiRingChart } from "@taiga-ui/addon-charts";
import { TuiTable } from "@taiga-ui/addon-table";
import { TuiFilterPipe } from "@taiga-ui/cdk";
import { TuiInputChip, TuiChevron } from "@taiga-ui/kit";
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {QuestionCountComponent} from './question-count/question-count.component'
import {CategoryStatsComponent} from './category-stats/category-stats.component'
import { TuiDataListWrapper, TuiHighlight, TuiTabs, TuiInputNumber, TuiSelect, TuiInputDate, TuiInputTime } from '@taiga-ui/kit'
import {FormsModule} from '@angular/forms'
import { TuiDataList, TuiLoader, TuiScrollbar, TuiScrollable, TuiDropdown, TuiIcon, TuiButton, TuiInput } from '@taiga-ui/core'
import {CoursesComponent} from './courses/courses.component'
import {SidebarModule} from '@app/components/sidebar/sidebar.module'
import {
    ExportPageViewComponentComponent
} from './export/export-page-view-component/export-page-view-component.component'
import {ExportSnippetComponent} from './export/export-snippet/export-snippet.component'
import {AdminRoutingModule} from "@app/admin/admin-routing.module"
import {ExportActionComponent} from './export/export-action/export-action.component'
import {AdminComponent} from "@app/admin/admin.component"
import {ExportConsentComponent} from './export/export-consent/export-consent.component'
import {ExportUserComponent} from './export/export-user/export-user.component'
import {ExportSurveyComponent} from './export/export-survey/export-survey.component'


@NgModule({
    declarations: [
        AdminComponent,
        CategoryStatsComponent,
        CoursesComponent,
        ExportActionComponent,
        ExportConsentComponent,
        ExportPageViewComponentComponent,
        ExportSnippetComponent,
        ExportSurveyComponent,
        ExportUserComponent,
        QuestionCountComponent,
    ],
    imports: [
        AdminRoutingModule,
        CommonModule,
        FormsModule,
        SidebarModule,
        TuiButton,
        ...TuiDataList,
        ...TuiDataListWrapper,
        TuiFilterPipe,
        TuiHighlight,
        ...TuiDropdown,
        ...TuiInputDate,
        ...TuiInput,
        ...TuiInputNumber,
        ...TuiInputTime,
        TuiCardLarge,
        TuiLoader,
        ...TuiInputChip,
        TuiChevron,
        TuiRingChart,
        TuiScrollbar, TuiScrollable,
        ...TuiSelect,
        TuiIcon,
        ...TuiTable,
        ...TuiTabs
    ]
})
export class AdminModule {
}
