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
import {DragulaModule} from "ng2-dragula";
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
import {ToastrModule} from "ngx-toastr";
import {MatDatepickerModule} from "@angular/material/datepicker";

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
        DragulaModule.forRoot(),
        ToastrModule.forRoot(),
    ]
})
export class CourseModule {
}
