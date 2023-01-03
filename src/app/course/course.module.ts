import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {
    CourseEventCreateEditComponent
} from '@app/course/course-event-create/course-event-create-edit.component'
import {CourseRegisterComponent} from '@app/course/course-registration/course-register.component'
import {CourseListComponent} from '@app/course/course-list/course-list.component'
import {CourseComponent} from '@app/course/course.component'
import {
    CourseEventsSnippetComponent
} from '@app/course/course-events-snippet/course-events-snippet.component'
import {TokenUseSnippetComponent} from '@app/course/token-use-snippet/token-use-snippet.component'
import {
    CourseQuestionSnippetComponent
} from '@app/course/course-question-snippet/course-question-snippet.component'
import {LeaderBoardComponent} from '@app/course/leader-board/leader-board.component'
import {CourseRoutingModule} from '@app/course/course-routing.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HighlightModule} from 'ngx-highlightjs'
import {CourseService} from '@app/course/_services/course.service'
import {CourseEventService} from '@app/course/_services/course-event.service'
import {TokenUseService} from '@app/course/_services/token-use.service'
import {ConceptMapComponent} from '@app/course/concept-map/concept-map.component'
import {
    TuiAccordionModule,
    TuiAvatarModule,
    TuiBreadcrumbsModule,
    TuiCheckboxLabeledModule,
    TuiDataListWrapperModule,
    TuiFieldErrorModule,
    TuiInputCountModule,
    TuiInputDateModule,
    TuiInputDateRangeModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiInputTimeModule,
    TuiIslandModule,
    TuiMarkerIconModule,
    TuiProgressModule,
    TuiSelectModule,
    TuiStepperModule,
    TuiTabsModule,
    TuiTagModule,
    TuiTextAreaModule
} from '@taiga-ui/kit'
import {
    TuiButtonModule,
    TuiCalendarModule,
    TuiDataListModule,
    TuiDialogModule,
    TuiErrorModule,
    TuiHintModule,
    TuiHostedDropdownModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiModeModule,
    TuiNotificationModule,
    TuiPointerHintModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core'
import {TextMaskModule} from 'angular2-text-mask'
import {
    CourseRegistrationStepperComponent
} from './course-registration/course-registration-stepper/course-registration-stepper.component'
import {
    CourseRegistrationStepComponent
} from './course-registration/course-registration-step/course-registration-step.component'
import {TuiActiveZoneModule, TuiFilterPipeModule, TuiForModule} from '@taiga-ui/cdk'
import {TuiTableModule} from '@taiga-ui/addon-table'
import {DragulaModule} from 'ng2-dragula'
import {CourseIslandModule} from '@app/components/course-island/course-island.module'
import {PipesModule} from '@app/_helpers/pipes/pipes.module'
import {PracticeProblemComponent} from './practice-problem/practice-problem.component'
import {ProblemsModule} from '@app/problems/problems.module'
import {TuiSidebarModule} from '@taiga-ui/addon-mobile'
import {SidebarModule} from '@app/components/sidebar/sidebar.module'
import {
    CourseChallengeSnippetComponent
} from './challenge/course-challenge-snippet/course-challenge-snippet.component'
import {GoalPageComponent} from './goal/goal-page/goal-page.component'
import {GoalCreateComponent} from './goal/goal-create/goal-create.component'
import {GoalComponent} from './goal/goal/goal.component'
import {
    TuiAxesModule,
    TuiBarChartModule,
    TuiRingChartModule
} from "@taiga-ui/addon-charts"
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


@NgModule({
    declarations: [
        ChallengeRowComponent,
        ConceptMapComponent,
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
        EventStatsBarChartComponent,
        EventStatsComponent,
        GoalComponent,
        GoalCreateComponent,
        GoalIslandComponent,
        GoalPageComponent,
        LeaderBoardComponent,
        ListOfTeamsComponent,
        PracticeProblemComponent,
        SubmissionChartComponent,
        TokenUseSnippetComponent,
    ],
    imports: [
        CommonModule,
        CourseIslandModule,
        CourseRoutingModule,
        FormsModule,
        HighlightModule,
        PipesModule,
        ProblemsModule,
        ReactiveFormsModule,
        SidebarModule,
        TextMaskModule,
        TuiAccordionModule,
        TuiActiveZoneModule,
        TuiAvatarModule,
        TuiAxesModule,
        TuiBarChartModule,
        TuiBreadcrumbsModule,
        TuiButtonModule,
        TuiCalendarModule,
        TuiCheckboxLabeledModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiDialogModule,
        TuiErrorModule,
        TuiFieldErrorModule,
        TuiFilterPipeModule,
        TuiForModule,
        TuiHintModule,
        TuiHostedDropdownModule,
        TuiInputCountModule,
        TuiInputDateModule,
        TuiInputDateRangeModule,
        TuiInputModule,
        TuiInputNumberModule,
        TuiInputTimeModule,
        TuiIslandModule,
        TuiLinkModule,
        TuiLoaderModule,
        TuiMarkerIconModule,
        TuiModeModule,
        TuiNotificationModule,
        TuiPointerHintModule,
        TuiProgressModule,
        TuiRingChartModule,
        TuiSelectModule,
        TuiSidebarModule,
        DragulaModule.forRoot(),
        TuiStepperModule,
        TuiSvgModule,
        TuiTableModule,
        TuiTabsModule,
        TuiTagModule,
        TuiTextAreaModule,
        TuiTextfieldControllerModule,
    ],
    providers: [
        CourseEventService,
        CourseService,
        TokenUseService
    ]
})
export class CourseModule {
}
