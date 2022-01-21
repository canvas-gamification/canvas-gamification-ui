import {ProblemCreateComponent} from "@app/problems/problem-create/problem-create.component";
import {HIGHLIGHT_OPTIONS, HighlightModule} from "ngx-highlightjs";
import {
    JavaCreateSnippetComponent
} from "@app/problems/problem-create/java-create-snippet/java-create-snippet.component";
import {McqViewSnippetComponent} from "@app/problems/problem-view/mcq-view-snippet/mcq-view-snippet.component";
import {JavaEditSnippetComponent} from "@app/problems/problem-edit/java-edit-snippet/java-edit-snippet.component";
import {CommonModule} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {
    ParsonsViewSnippetComponent
} from "@app/problems/problem-view/parsons-view-snippet/parsons-view-snippet.component";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SubmissionSnippetComponent} from "@app/problems/problem-view/submission-snippet/submission-snippet.component";
import {McqCreateSnippetComponent} from "@app/problems/problem-create/mcq-create-snippet/mcq-create-snippet.component";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";
import {ProblemEditComponent} from "@app/problems/problem-edit/problem-edit.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AceComponent} from "@app/problems/ace/ace.component";
import {ProblemViewComponent} from "@app/problems/problem-view/problem-view.component";
import {McqEditSnippetComponent} from "@app/problems/problem-edit/mcq-edit-snippet/mcq-edit-snippet.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {AceEditorModule} from "ng2-ace-editor";
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {
    ParsonsEditSnippetComponent
} from "@app/problems/problem-edit/parsons-edit-snippet/parsons-edit-snippet.component";
import {SubmissionViewComponent} from "@app/problems/submission-view/submission-view.component";
import {ProblemSetComponent} from "@app/problems/problem-set/problem-set.component";
import {JavaViewSnippetComponent} from "@app/problems/problem-view/java-view-snippet/java-view-snippet.component";
import {VariableViewComponent} from "@app/problems/problem-view/variable-view/variable-view.component";
import {
    ParsonsCreateSnippetComponent
} from "@app/problems/problem-create/parsons-create-snippet/parsons-create-snippet.component";
import {ProblemsRoutingModule} from "@app/problems/problems-routing.module";
import {DragulaModule} from "ng2-dragula";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {UqjService} from "@app/problems/_services/uqj.service";
import {QuestionService} from "@app/problems/_services/question.service";
import {SchemaService} from "@app/problems/_services/schema.service";
import {SubmissionService} from "@app/problems/_services/submission.service";
import {ParsonsLinesComponent} from './problem-view/parsons-lines/parsons-lines.component';
import {TuiTableModule, TuiTablePaginationModule} from "@taiga-ui/addon-table";
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
import {PipesModule} from "@app/_helpers/pipes/pipes.module";
import {TestCasesComponent} from "@app/problems/json-editor/test-cases/test-cases.component";
import {ParsonsInputFilesComponent} from "@app/problems/json-editor/parsons-input-files/parsons-input-files.component";
import {JavaInputFilesComponent} from "@app/problems/json-editor/java-input-files/java-input-files.component";
import {VariableComponent} from "@app/problems/json-editor/variable/variable.component";

@NgModule({
    declarations: [
        ProblemSetComponent,
        ProblemViewComponent,
        ProblemEditComponent,
        ProblemCreateComponent,
        AceComponent,
        McqViewSnippetComponent,
        JavaViewSnippetComponent,
        ParsonsViewSnippetComponent,
        ParsonsEditSnippetComponent,
        McqEditSnippetComponent,
        JavaEditSnippetComponent,
        McqCreateSnippetComponent,
        JavaCreateSnippetComponent,
        ParsonsCreateSnippetComponent,
        VariableViewComponent,
        JsonEditorComponent,
        SubmissionSnippetComponent,
        SubmissionViewComponent,
        CkEditorComponent,
        ParsonsLinesComponent,
        TestCasesComponent,
        ParsonsInputFilesComponent,
        JavaInputFilesComponent,
        VariableComponent,
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
        SchemaService,
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
