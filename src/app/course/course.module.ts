import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseEventCreateEditComponent} from '@app/course/course-event-create/course-event-create-edit.component';
import {CourseRegisterComponent} from '@app/course/course-registration/course-register.component';
import {CourseListComponent} from '@app/course/course-list/course-list.component';
import {CourseComponent} from '@app/course/course.component';
import {CourseEventsSnippetComponent} from '@app/course/course-events-snippet/course-events-snippet.component';
import {TokenUseSnippetComponent} from '@app/course/token-use-snippet/token-use-snippet.component';
import {CourseQuestionSnippetComponent} from '@app/course/course-question-snippet/course-question-snippet.component';
import {LeaderBoardComponent} from '@app/course/leader-board/leader-board.component';
import {CourseRoutingModule} from '@app/course/course-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HighlightModule} from 'ngx-highlightjs';
import {CourseService} from '@app/course/_services/course.service';
import {CourseEventService} from '@app/course/_services/course-event.service';
import {TokenUseService} from '@app/course/_services/token-use.service';
import {ConceptMapComponent} from '@app/course/concept-map/concept-map.component';
import {
    TuiAvatarModule,
    TuiCheckboxLabeledModule,
    TuiFieldErrorModule,
    TuiInputCountModule,
    TuiInputDateModule,
    TuiInputDateRangeModule,
    TuiInputModule,
    TuiInputTimeModule,
    TuiIslandModule, 
    TuiMarkerIconModule,
    TuiSelectModule,
    TuiStepperModule,
    TuiTabsModule,
    TuiTagModule
} from '@taiga-ui/kit';
import {
    TuiButtonModule,
    TuiCalendarModule,
    TuiDataListModule,
    TuiDialogModule,
    TuiErrorModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiNotificationModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {TextMaskModule} from 'angular2-text-mask';
import {
    CourseRegistrationStepperComponent
} from './course-registration/course-registration-stepper/course-registration-stepper.component';
import {
    CourseRegistrationStepComponent
} from './course-registration/course-registration-step/course-registration-step.component';
import {TuiFilterPipeModule} from '@taiga-ui/cdk';
import {TuiTableModule} from '@taiga-ui/addon-table';
import {DragulaModule} from 'ng2-dragula';
import {CourseIslandModule} from '@app/components/course-island/course-island.module';
import {PipesModule} from '@app/_helpers/pipes/pipes.module';
import {PracticeProblemComponent} from './practice-problem/practice-problem.component';
import {ProblemsModule} from '@app/problems/problems.module';

@NgModule({
    declarations: [
        ConceptMapComponent,
        CourseComponent,
        CourseEventCreateEditComponent,
        CourseEventsSnippetComponent,
        CourseListComponent,
        CourseQuestionSnippetComponent,
        CourseRegisterComponent,
        CourseRegistrationStepComponent,
        CourseRegistrationStepperComponent,
        LeaderBoardComponent,
        PracticeProblemComponent,
        TokenUseSnippetComponent
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
        TextMaskModule,
        TuiAvatarModule,
        TuiButtonModule,
        TuiCalendarModule,
        TuiCheckboxLabeledModule,
        TuiDataListModule,
        TuiDialogModule,
        TuiErrorModule,
        TuiFieldErrorModule,
        TuiFilterPipeModule,
        TuiInputCountModule,
        TuiInputDateModule,
        TuiInputDateRangeModule,
        TuiInputModule,
        TuiInputTimeModule,
        TuiIslandModule,
        TuiLinkModule,
        TuiLoaderModule,
        TuiMarkerIconModule,
        TuiNotificationModule,
        TuiSelectModule,
        TuiStepperModule,
        TuiSvgModule,
        TuiTableModule,
        TuiTabsModule,
        TuiTagModule,
        TuiTextfieldControllerModule,
        DragulaModule.forRoot(),
    ],
    providers: [
        CourseEventService,
        CourseService,
        TokenUseService
    ]
})
export class CourseModule {
}
