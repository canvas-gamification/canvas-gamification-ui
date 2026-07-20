import { TuiIslandDirective, TuiTextfieldControllerModule, TuiTextareaModule, TuiInputModule, TuiInputNumberModule, TuiMultiSelectModule, TuiSelectModule, TuiTagModule } from "@taiga-ui/legacy";
import { TuiActiveZone } from "@taiga-ui/cdk";
import { TuiEditorSocket } from "@taiga-ui/editor";
import {ProblemCreateEditComponent} from '@app/problems/problem-create-edit/problem-create-edit.component'
import {
    JavaCreateEditSnippetComponent
} from '@app/problems/problem-create-edit/java-create-edit-snippet/java-create-edit-snippet.component'
import {McqViewSnippetComponent} from '@app/problems/problem-view/mcq-view-snippet/mcq-view-snippet.component'
import {CommonModule} from '@angular/common'
import {
    ParsonsViewSnippetComponent
} from '@app/problems/problem-view/parsons-view-snippet/parsons-view-snippet.component'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {SubmissionSnippetComponent} from '@app/problems/problem-view/submission-snippet/submission-snippet.component'
import {
    McqCreateEditSnippetComponent
} from '@app/problems/problem-create-edit/mcq-create-edit-snippet/mcq-create-edit-snippet.component'
import {ProblemViewComponent} from '@app/problems/problem-view/problem-view.component'
import {SubmissionViewComponent} from '@app/problems/submission-view/submission-view.component'
import {ProblemSetComponent} from '@app/problems/problem-set/problem-set.component'
import {JavaViewSnippetComponent} from '@app/problems/problem-view/java-view-snippet/java-view-snippet.component'
import {VariableViewComponent} from '@app/problems/problem-view/variable-view/variable-view.component'
import {
    ParsonsCreateEditSnippetComponent
} from '@app/problems/problem-create-edit/parsons-create-edit-snippet/parsons-create-edit-snippet.component'
import {ProblemsRoutingModule} from '@app/problems/problems-routing.module'
import {DragulaModule} from 'ng2-dragula'
import {DifficultyService} from '@app/problems/_services/difficulty.service'
import {UqjService} from '@app/problems/_services/uqj.service'
import {QuestionService} from '@app/problems/_services/question.service'
import {SubmissionService} from '@app/problems/_services/submission.service'
import {ParsonsLinesComponent} from './problem-view/parsons-lines/parsons-lines.component'
import { TuiTablePagination, TuiTable } from '@taiga-ui/addon-table'
import { TuiNotification, TuiDataList, TuiError, TuiLoader, TuiLabel, TuiDropdown, TuiIcon, TuiDialog, TuiButton, TuiHint } from '@taiga-ui/core'
import { TuiAccordion, TuiStringifyContentPipe, TuiFieldErrorPipe, TuiFieldErrorContentPipe, TuiBadge, TuiBlock, TuiCheckbox, TuiRadio, TuiTabs, TuiStringifyPipe, TuiButtonLoading } from '@taiga-ui/kit'
import {TabListViewSwitcherModule} from '@app/components/tab-list-view-switcher/tab-list-view-switcher.module'
import {PipesModule} from '@app/_helpers/pipes/pipes.module'
import {TestCasesEditorComponent} from '@app/problems/json-editor/test-cases-editor/test-cases-editor.component'
import {
    ParsonsInputFilesEditorComponent
} from '@app/problems/json-editor/parsons-input-files-editor/parsons-input-files-editor.component'
import {
    JavaInputFilesEditorComponent
} from '@app/problems/json-editor/java-input-files-editor/java-input-files-editor.component'
import {VariablesEditorComponent} from '@app/problems/json-editor/variables-editor/variables-editor.component'
import {AbstractEditorComponent} from './json-editor/abstract-editor/abstract-editor.component'
import {
    DefaultCreateEditSnippetComponent
} from './problem-create-edit/default-create-edit-snippet/default-create-edit-snippet.component'
import {CodeEditorModule} from '@app/components/code-editor/code-editor.module'
import {EditorModule} from '@app/components/editor/editor.module'
import {SidebarModule} from '@app/components/sidebar/sidebar.module'
import {ProblemReportModalComponent} from './problem-report/problem-report-modal.component'
import {VariationTypesSelectorComponent} from './problem-create-edit/variation-types-selector/variation-types-selector.component'

@NgModule({
    declarations: [
        AbstractEditorComponent,
        DefaultCreateEditSnippetComponent,
        JavaCreateEditSnippetComponent,
        JavaInputFilesEditorComponent,
        JavaViewSnippetComponent,
        McqCreateEditSnippetComponent,
        McqViewSnippetComponent,
        ParsonsCreateEditSnippetComponent,
        ParsonsInputFilesEditorComponent,
        ParsonsLinesComponent,
        ParsonsViewSnippetComponent,
        ProblemCreateEditComponent,
        ProblemReportModalComponent,
        ProblemSetComponent,
        ProblemViewComponent,
        SubmissionSnippetComponent,
        SubmissionViewComponent,
        TestCasesEditorComponent,
        VariablesEditorComponent,
        VariableViewComponent,
        VariationTypesSelectorComponent,
    ],
    imports: [
        CodeEditorModule,
        CommonModule,
        DragulaModule.forRoot(),
        EditorModule,
        FormsModule,
        PipesModule,
        ProblemsRoutingModule,
        ReactiveFormsModule,
        SidebarModule,
        TabListViewSwitcherModule,
        ...TuiAccordion,
        TuiActiveZone,
        TuiBadge,
        TuiButton,
        TuiButtonLoading,
        TuiBlock, TuiCheckbox,
        TuiLabel,
        ...TuiDataList,
        TuiDialog,
        ...TuiDropdown,
        TuiEditorSocket,
        TuiFieldErrorPipe, TuiFieldErrorContentPipe,
        ...TuiHint,
        TuiInputNumberModule,
        TuiInputModule,
        TuiIslandDirective,
        TuiLoader,
        TuiMultiSelectModule,
        TuiNotification, ...TuiRadio,
        TuiSelectModule,
        TuiStringifyContentPipe,
        TuiStringifyPipe,
        TuiIcon,
        ...TuiTable,
        TuiTablePagination,
        ...TuiTabs,
        TuiTagModule,
        TuiTextareaModule,
        TuiTextfieldControllerModule,
        TuiError
    ],
    exports: [
        ProblemReportModalComponent,
        ProblemViewComponent,
    ],
    providers: [
        DifficultyService,
        QuestionService,
        SubmissionService,
        UqjService
    ]
})
export class ProblemsModule {
}
