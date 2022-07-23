import {Component} from '@angular/core'
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms"
import {AbstractEditorComponent} from "@app/problems/json-editor/abstract-editor/abstract-editor.component"
import {TestCasesForm} from "@app/problems/_forms/json-editor/test-cases.form"

@Component({
    selector: 'app-test-cases-editor',
    templateUrl: './test-cases-editor.component.html',
    styleUrls: ['./test-cases-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: TestCasesEditorComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: TestCasesEditorComponent
        },
    ]
})
export class TestCasesEditorComponent extends AbstractEditorComponent {

    addNewModel(): void {
        this.models.push(TestCasesForm.createTestCaseForm())
    }
}
