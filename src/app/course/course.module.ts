import { TuiSidebar } from "@taiga-ui/addon-mobile";
import { TuiIslandDirective, TuiTextfieldControllerModule, TuiTextareaModule, TuiInputModule, TuiInputDateModule, TuiInputDateRangeModule, TuiInputNumberModule, TuiInputTimeModule, TuiMultiSelectModule, TuiSelectModule, TuiTagModule } from "@taiga-ui/legacy";
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {
    CourseEventCreateEditComponent
} from '@app/course/event/course-event-create/course-event-create-edit.component'
import {CourseRegisterComponent} from '@app/course/course-registration/course-register.component'
import {CourseListComponent} from '@app/course/course-list/course-list.component'
import {CourseComponent} from '@app/course/course.component'
import {
    CourseEventsSnippetComponent
} from '@app/course/event/course-events-snippet/course-events-snippet.component'
import {
    CourseQuestionSnippetComponent
} from '@app/course/course-question-snippet/course-question-snippet.component'
import {LeaderBoardComponent} from '@app/course/leader-board/leader-board.component'
import {CourseRoutingModule} from '@app/course/course-routing.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {CourseService} from '@app/course/_services/course.service'
import {CourseEventService} from '@app/course/_services/course-event.service'
import {TokenUseService} from '@app/course/_services/token-use.service'
import {ConceptMapComponent} from '@app/course/concept-map/concept-map.component'
import { TuiPagination, TuiDataListWrapper, TuiAccordion, TuiBreadcrumbs, TuiStepper, TuiFieldErrorPipe, TuiFieldErrorContentPipe, TuiAvatar, TuiSwitch, TuiBlock, TuiCheckbox, TuiTabs, TuiProgress, TuiButtonLoading } from '@taiga-ui/kit'
import { TuiNotification, TuiCalendar, TuiDataList, TuiError, TuiLoader, TuiScrollbar, TuiScrollable, TuiGroup, TuiLabel, TuiDropdown, TuiIcon, TuiLink, TuiDialog, TuiButton, TuiHint, TuiAutoColorPipe, TuiInitialsPipe } from '@taiga-ui/core'
import {
    CourseRegistrationStepperComponent
} from './course-registration/course-registration-stepper/course-registration-stepper.component'
import {
    CourseRegistrationStepComponent
} from './course-registration/course-registration-step/course-registration-step.component'
import { TuiActiveZone, TuiFor, TuiItem, TuiFilterPipe } from '@taiga-ui/cdk'
import { TuiTablePagination, TuiTable } from '@taiga-ui/addon-table'
import {DragulaModule} from 'ng2-dragula'
import {CourseIslandModule} from '@app/components/course-island/course-island.module'
import {PipesModule} from '@app/_helpers/pipes/pipes.module'
import {PracticeProblemComponent} from './practice-problem/practice-problem.component'
import {ProblemsModule} from '@app/problems/problems.module'
import {SidebarModule} from '@app/components/sidebar/sidebar.module'
import {
    CourseChallengeSnippetComponent
} from './challenge/course-challenge-snippet/course-challenge-snippet.component'
import {GoalPageComponent} from './goal/goal-page/goal-page.component'
import {GoalCreateComponent} from './goal/goal-create/goal-create.component'
import {GoalComponent} from './goal/goal/goal.component'
import { TuiAxes, TuiBarChart, TuiRingChart } from "@taiga-ui/addon-charts"
import {ListOfTeamsComponent} from './challenge/list-of-teams/list-of-teams.component'
import {SubmissionChartComponent} from './goal/submission-chart/submission-chart.component'
import {CourseCreateComponent} from './course-create/course-create.component'
import {GoalIslandComponent} from './goal/goal-island/goal-island.component'
import {CoursePracticePageComponent} from './course-practice-page/course-practice-page.component'
import {CoursePracticeComponent} from './course-practice/course-practice.component'
import {CourseHomepageComponent} from './course-homepage/course-homepage.component'
import {EventStatsComponent} from './event/event-stats/event-stats.component'
import {
    EventStatsBarChartComponent
} from './event/event-stats-bar-chart/event-stats-bar-chart.component'
import {ChallengeRowComponent} from './challenge/challenge-row/challenge-row.component'
import {TeamCreateEditComponent} from './challenge/team-create-edit/team-create-edit.component'
import {
    CourseChallengeCreateEditComponent
} from './challenge/course-challenge-create-edit/course-challenge-create-edit.component'
import {EventRowComponent} from './event/event-row/event-row.component'
import {AddToEventModalComponent} from './event/add-to-event-modal/add-to-event-modal.component'
import {LeaderBoardPageComponent} from './leader-board-page/leader-board-page.component'
import {EditorModule} from "@app/components/editor/editor.module"
import {
    EventQuestionViewComponent
} from './event/event-question-view/event-question-view.component'
import {ConceptListComponent} from './concept-list/concept-list.component'
import {TokensComponent} from '@app/course/token/tokens/tokens.component'
import {
    IndividualTokensComponent
} from '@app/course/token/individual-tokens/individual-tokens.component'
import {TokenOverviewComponent} from './token/token-overview/token-overview.component'
import {TokenDetailedViewComponent} from './token/token-detailed-view/token-detailed-view.component'
import {
    EventStatsSubmissionViewComponent
} from './event/event-stats-submission-view/event-stats-submission-view.component'
import {CodeEditorModule} from "@app/components/code-editor/code-editor.module"

@NgModule({
    declarations: [
        AddToEventModalComponent,
        ChallengeRowComponent,
        ConceptListComponent,
        ConceptMapComponent,
        CourseChallengeCreateEditComponent,
        CourseChallengeSnippetComponent,
        CourseComponent,
        CourseCreateComponent,
        CourseEventCreateEditComponent,
        CourseEventsSnippetComponent,
        CourseHomepageComponent,
        CourseListComponent,
        CoursePracticeComponent,
        CoursePracticePageComponent,
        CourseQuestionSnippetComponent,
        CourseRegisterComponent,
        CourseRegistrationStepComponent,
        CourseRegistrationStepperComponent,
        EventQuestionViewComponent,
        EventRowComponent,
        EventStatsBarChartComponent,
        EventStatsComponent,
        EventStatsSubmissionViewComponent,
        GoalComponent,
        GoalCreateComponent,
        GoalIslandComponent,
        GoalPageComponent,
        IndividualTokensComponent,
        LeaderBoardComponent,
        LeaderBoardPageComponent,
        ListOfTeamsComponent,
        PracticeProblemComponent,
        SubmissionChartComponent,
        TeamCreateEditComponent,
        TokenDetailedViewComponent,
        TokenOverviewComponent,
        TokensComponent,
    ],
    imports: [
        CodeEditorModule,
        CommonModule,
        CourseIslandModule,
        CourseRoutingModule,
        EditorModule,
        FormsModule,
        PipesModule,
        ProblemsModule,
        ReactiveFormsModule,
        SidebarModule,
        ...TuiAccordion,
        TuiActiveZone,
        TuiAvatar,
        TuiAxes,
        TuiBarChart,
        TuiBreadcrumbs, TuiItem,
        TuiButton,
        TuiButtonLoading,
        TuiAutoColorPipe,
        TuiInitialsPipe,
        TuiCalendar,
        TuiBlock, TuiCheckbox,
        TuiLabel,
        ...TuiDataList,
        ...TuiDataListWrapper,
        TuiDialog,
        TuiError,
        TuiFieldErrorPipe, TuiFieldErrorContentPipe,
        TuiFilterPipe,
        TuiFor,
        TuiGroup,
        ...TuiHint,
        ...TuiDropdown,
        TuiInputNumberModule,
        TuiInputDateModule,
        TuiInputDateRangeModule,
        TuiInputModule,
        TuiInputTimeModule,
        TuiIslandDirective,
        TuiLink,
        TuiLoader,
        TuiMultiSelectModule,
        TuiNotification,
        TuiPagination,
        ...TuiProgress,
        TuiRingChart,
        TuiScrollbar, TuiScrollable,
        TuiSelectModule,
        ...TuiSidebar,
        ...TuiStepper,
        TuiIcon,
        ...TuiTable,
        TuiTablePagination,
        ...TuiTabs,
        TuiTagModule,
        TuiTextareaModule,
        DragulaModule.forRoot(),
        TuiTextfieldControllerModule,
        TuiSwitch,

    ],
    providers: [
        CourseEventService,
        CourseService,
        TokenUseService
    ]
})
export class CourseModule {
}
