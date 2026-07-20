import {Component} from '@angular/core'
import {AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms'
import {ParsonsInputFilesForm} from "@app/problems/_forms/json-editor/parsons-input-files.form"
import {AbstractEditorComponent} from "@app/problems/json-editor/abstract-editor/abstract-editor.component"

@Component({
    selector: 'app-parsons-input-files-editor',
    templateUrl: './parsons-input-files-editor.component.html',
    styleUrls: ['./parsons-input-files-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ParsonsInputFilesEditorComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: ParsonsInputFilesEditorComponent
        },
    ]
})
export class ParsonsInputFilesEditorComponent extends AbstractEditorComponent {

    codeBlock = ''

    addNewModel(): void {
        this.models.push(ParsonsInputFilesForm.createParsonsInputFileForm())
    }

    addNewLine(form: AbstractControl): UntypedFormControl {
        const newControl = ParsonsInputFilesForm.createLinesControl()
        this.getLines(form)?.push(newControl)
        return newControl
    }

    removeLine(form: AbstractControl, index: number): void {
        this.getLines(form)?.removeAt(index)
    }

    getLines(form: AbstractControl): UntypedFormArray {
        return (form as UntypedFormGroup).controls.lines as UntypedFormArray
    }

    setLinesFromCodeBlock(form: AbstractControl): void {
        this.getLines(form)?.clear()
        this.codeBlock.split('\n').forEach(line => {
            this.addNewLine(form).setValue(line.trim())
        })
        this.codeBlock = ''
    }
}
