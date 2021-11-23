import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseEventCreateEditComponent} from "@app/course/course-event-create/course-event-create-edit.component";
import {CourseRegisterComponent} from "@app/course/course-registration/course-register.component";
import {CourseListComponent} from "@app/course/course-list/course-list.component";
import {CourseComponent} from "@app/course/course.component";
import {CourseEventsSnippetComponent} from "@app/course/course-events-snippet/course-events-snippet.component";
import {TokenUseSnippetComponent} from "@app/course/token-use-snippet/token-use-snippet.component";
import {CourseQuestionSnippetComponent} from "@app/course/course-question-snippet/course-question-snippet.component";
import {LeaderBoardComponent} from "@app/course/leader-board/leader-board.component";
import {CourseRoutingModule} from "@app/course/course-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {AceEditorModule} from "ng2-ace-editor";
import {HighlightModule} from "ngx-highlightjs";
import {MatIconModule} from "@angular/material/icon";
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CourseService} from "@app/course/_services/course.service";
import {CourseEventService} from "@app/course/_services/course-event.service";
import {TokenUseService} from "@app/course/_services/token-use.service";
import {ConceptMapComponent} from "@app/course/concept-map/concept-map.component";
import {TuiFieldErrorModule, TuiInputModule, TuiIslandModule, TuiStepperModule, TuiTagModule} from "@taiga-ui/kit";
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiLoaderModule,
    TuiNotificationModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TextMaskModule} from "angular2-text-mask";
import {CourseRegistrationStepperComponent} from './course-registration/course-registration-stepper/course-registration-stepper.component';
import {CourseRegistrationStepComponent} from './course-registration/course-registration-step/course-registration-step.component';
import {TuiFilterPipeModule} from "@taiga-ui/cdk";
import {TeamComponent} from './team/team.component';

@NgModule({
    declarations: [
        CourseListComponent,
        CourseRegisterComponent,
        CourseComponent,
        CourseEventsSnippetComponent,
        TokenUseSnippetComponent,
        CourseQuestionSnippetComponent,
        CourseEventCreateEditComponent,
        LeaderBoardComponent,
        ConceptMapComponent,
        CourseRegistrationStepperComponent,
        CourseRegistrationStepComponent,
        TeamComponent
    ],
    imports: [
        CommonModule,
        CourseRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        MatPaginatorModule,
        MatIconModule,
        MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatSortModule,
        MatTableModule,
        MatDatepickerModule,
        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        MatSelectModule,
        FontAwesomeModule,
        AceEditorModule,
        HighlightModule,
        TuiStepperModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiFieldErrorModule,
        TuiButtonModule,
        TextMaskModule,
        TuiNotificationModule,
        TuiErrorModule,
        TuiLoaderModule,
        TuiIslandModule,
        TuiTagModule,
        TuiFilterPipeModule
    ],
    providers: [
        CourseService,
        CourseEventService,
        TokenUseService
    ]
})
export class CourseModule {
}
