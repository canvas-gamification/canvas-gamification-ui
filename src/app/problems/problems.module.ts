import {ProblemCreateEditComponent} from "@app/problems/problem-create-edit/problem-create-edit.component";
import {HIGHLIGHT_OPTIONS, HighlightModule} from "ngx-highlightjs";
import {
    JavaCreateEditSnippetComponent
} from "@app/problems/problem-create-edit/java-create-edit-snippet/java-create-edit-snippet.component";
import {McqViewSnippetComponent} from "@app/problems/problem-view/mcq-view-snippet/mcq-view-snippet.component";
import {CommonModule} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {
    ParsonsViewSnippetComponent
} from "@app/problems/problem-view/parsons-view-snippet/parsons-view-snippet.component";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SubmissionSnippetComponent} from "@app/problems/problem-view/submission-snippet/submission-snippet.component";
import {
    McqCreateEditSnippetComponent
} from "@app/problems/problem-create-edit/mcq-create-edit-snippet/mcq-create-edit-snippet.component";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AceComponent} from "@app/problems/ace/ace.component";
import {ProblemViewComponent} from "@app/problems/problem-view/problem-view.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {AceEditorModule} from "ng2-ace-editor";
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {SubmissionViewComponent} from "@app/problems/submission-view/submission-view.component";
import {ProblemSetComponent} from "@app/problems/problem-set/problem-set.component";
import {JavaViewSnippetComponent} from "@app/problems/problem-view/java-view-snippet/java-view-snippet.component";
import {VariableViewComponent} from "@app/problems/problem-view/variable-view/variable-view.component";
import {
    ParsonsCreateEditSnippetComponent
} from "@app/problems/problem-create-edit/parsons-create-edit-snippet/parsons-create-edit-snippet.component";
import {ProblemsRoutingModule} from "@app/problems/problems-routing.module";
import {DragulaModule} from "ng2-dragula";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {UqjService} from "@app/problems/_services/uqj.service";
import {QuestionService} from "@app/problems/_services/question.service";
import {SubmissionService} from "@app/problems/_services/submission.service";
import {ParsonsLinesComponent} from './problem-view/parsons-lines/parsons-lines.component';
import {TuiReorderModule, TuiTableModule, TuiTablePaginationModule} from "@taiga-ui/addon-table";
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiDescribedByModule,
    TuiDialogModule,
    TuiDropdownControllerModule,
    TuiHintModule,
    TuiHostedDropdownModule,
    TuiLabelModule,
    TuiLoaderModule,
    TuiNotificationModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
    TuiAccordionModule, TuiBadgeModule,
    TuiCheckboxBlockModule,
    TuiCheckboxLabeledModule,
    TuiFieldErrorModule,
    TuiInputCountModule,
    TuiInputModule,
    TuiIslandModule,
    TuiRadioBlockModule,
    TuiRadioLabeledModule,
    TuiSelectModule,
    TuiStringifyContentPipeModule,
    TuiStringifyPipeModule,
    TuiTabsModule,
    TuiTagModule,
    TuiTextAreaModule
} from "@taiga-ui/kit";
import {TabListViewSwitcherModule} from "@app/components/tab-list-view-switcher/tab-list-view-switcher.module";
import {VariableComponent} from './json-editor/variable/variable.component';
import {PipesModule} from "@app/_helpers/pipes/pipes.module";
import {JavaInputFilesComponent} from './json-editor/java-input-files/java-input-files.component';
import {ParsonsInputFilesComponent} from './json-editor/parsons-input-files/parsons-input-files.component';
import {TestCasesComponent} from './json-editor/test-cases/test-cases.component';
import {
    DefaultCreateEditSnippetComponent
} from './problem-create-edit/default-create-edit-snippet/default-create-edit-snippet.component';

@NgModule({
    declarations: [
        ProblemSetComponent,
        ProblemViewComponent,
        ProblemCreateEditComponent,
        AceComponent,
        McqViewSnippetComponent,
        JavaViewSnippetComponent,
        ParsonsViewSnippetComponent,
        McqCreateEditSnippetComponent,
        JavaCreateEditSnippetComponent,
        ParsonsCreateEditSnippetComponent,
        VariableViewComponent,
        JsonEditorComponent,
        SubmissionSnippetComponent,
        SubmissionViewComponent,
        CkEditorComponent,
        ParsonsLinesComponent,
        VariableComponent,
        JavaInputFilesComponent,
        ParsonsInputFilesComponent,
        TestCasesComponent,
        DefaultCreateEditSnippetComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        MatPaginatorModule,
        FontAwesomeModule,
        MatSortModule,
        MatTableModule,
        AceEditorModule,
        HighlightModule,
        ProblemsRoutingModule,
        DragulaModule.forRoot(),
        TuiTableModule,
        TuiButtonModule,
        TuiTablePaginationModule,
        TuiSelectModule,
        TuiDataListModule,
        TuiLoaderModule,
        TuiDescribedByModule,
        TuiHintModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiDialogModule,
        TuiDropdownControllerModule,
        TuiSvgModule,
        TuiHostedDropdownModule,
        TuiTagModule,
        TuiIslandModule,
        TuiRadioLabeledModule,
        TuiNotificationModule,
        TuiAccordionModule,
        TuiTabsModule,
        TuiReorderModule,
        TuiCheckboxLabeledModule,
        TuiCheckboxBlockModule,
        TuiRadioBlockModule,
        TuiFieldErrorModule,
        TuiLabelModule,
        TabListViewSwitcherModule,
        TuiInputCountModule,
        TuiTextAreaModule,
        PipesModule,
        TuiStringifyPipeModule,
        TuiStringifyContentPipeModule,
        TuiBadgeModule,
    ],
    providers: [
        DifficultyService,
        UqjService,
        QuestionService,
        SubmissionService,
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
                languages: {
                    java: () => import('highlight.js/lib/languages/java')
                }
            }
        }]
})
export class ProblemsModule {
}
