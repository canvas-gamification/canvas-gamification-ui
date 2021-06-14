import {ProblemCreateComponent} from "@app/problems/problems/problem-create/problem-create.component";
import {HIGHLIGHT_OPTIONS, HighlightModule} from "ngx-highlightjs";
import {JavaCreateSnippetComponent} from "@app/problems/problems/problem-create/java-create-snippet/java-create-snippet.component";
import {McqViewSnippetComponent} from "@app/problems/problems/problem-view/mcq-view-snippet/mcq-view-snippet.component";
import {JavaEditSnippetComponent} from "@app/problems/problems/problem-edit/java-edit-snippet/java-edit-snippet.component";
import {CommonModule} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ParsonsViewSnippetComponent} from "@app/problems/problems/problem-view/parsons-view-snippet/parsons-view-snippet.component";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SubmissionSnippetComponent} from "@app/problems/problems/problem-view/submission-snippet/submission-snippet.component";
import {ToastrModule} from "ngx-toastr";
import {McqCreateSnippetComponent} from "@app/problems/problems/problem-create/mcq-create-snippet/mcq-create-snippet.component";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {JsonEditorComponent} from "@app/problems/problems/json-editor/json-editor.component";
import {ProblemEditComponent} from "@app/problems/problems/problem-edit/problem-edit.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AceComponent} from "@app/problems/problems/problem-view/ace/ace.component";
import {ProblemViewComponent} from "@app/problems/problems/problem-view/problem-view.component";
import {McqEditSnippetComponent} from "@app/problems/problems/problem-edit/mcq-edit-snippet/mcq-edit-snippet.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {AceEditorModule} from "ng2-ace-editor";
import {CkEditorComponent} from "@app/problems/problems/ck-editor/ck-editor.component";
import {ParsonsEditSnippetComponent} from "@app/problems/problems/problem-edit/parsons-edit-snippet/parsons-edit-snippet.component";
import {SubmissionViewComponent} from "@app/problems/problems/submission-view/submission-view.component";
import {ProblemSetComponent} from "@app/problems/problems/problem-set/problem-set.component";
import {DragulaModule} from "ng2-dragula";
import {JavaViewSnippetComponent} from "@app/problems/problems/problem-view/java-view-snippet/java-view-snippet.component";
import {VariableViewComponent} from "@app/problems/problems/problem-view/variable-view/variable-view.component";
import {AccountsRoutingModule} from "@app/accounts/accounts-routing.module";
import {ParsonsCreateSnippetComponent} from "@app/problems/problems/problem-create/parsons-create-snippet/parsons-create-snippet.component";
import {AppRoutingModule} from "@app/app-routing.module";
import {ProblemsRoutingModule} from "@app/problems/problems-routing.module";


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
        DragulaModule.forRoot(),
        HighlightModule,
        ProblemsRoutingModule,
    ],
    providers: [
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
