import {Component} from '@angular/core'
import {AbstractControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms'
import {JavaInputFilesForm} from "@app/problems/_forms/json-editor/java-input-files.form"
import {AbstractEditorComponent} from "@app/problems/json-editor/abstract-editor/abstract-editor.component"

@Component({
    selector: 'app-java-input-files-editor',
    templateUrl: './java-input-files-editor.component.html',
    styleUrls: ['./java-input-files-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: JavaInputFilesEditorComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: JavaInputFilesEditorComponent
        },
    ]
})
export class JavaInputFilesEditorComponent extends AbstractEditorComponent {

    addNewModel(): void {
        this.models.push(JavaInputFilesForm.createJavaInputFileForm())
    }

    setInputTemplate(form: AbstractControl, value: string): void {
        (form as FormGroup).controls.template.setValue(value)
    }
}
