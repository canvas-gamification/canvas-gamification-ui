import {Component, OnDestroy, ChangeDetectionStrategy} from '@angular/core'
import {AbstractControl, UntypedFormArray, UntypedFormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms"
import {VariablesForm} from "@app/problems/_forms/json-editor/variables.form"
import {VariableEditorTypes} from "@app/_models/json_editor"
import {AbstractEditorComponent} from "@app/problems/json-editor/abstract-editor/abstract-editor.component"
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'

@Component({
    selector: 'app-variables-editor',
    templateUrl: './variables-editor.component.html',
    styleUrls: ['./variables-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: VariablesEditorComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: VariablesEditorComponent
        },
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class VariablesEditorComponent extends AbstractEditorComponent implements OnDestroy {

    openNewValueDropdown = false
    modelTypes: VariableEditorTypes[] = ['int', 'float', 'choice', 'expression', 'enum']

    onDrop(event: CdkDragDrop<unknown>): void {
        const controls = [...this.models.controls]
        moveItemInArray(controls, event.previousIndex, event.currentIndex)
        this.models.clear()
        controls.forEach(control => {
            this.models.push(control)
        })
    }

    addNewModel(type: VariableEditorTypes): void {
        this.models.push(VariablesForm.getNewVariableForm(type))
    }

    addNewValue(form: AbstractControl): void {
        this.getValues(form)?.push(VariablesForm.createValuesControl())
    }

    removeValue(form: AbstractControl, index: number): void {
        this.getValues(form)?.removeAt(index)
    }

    getValues(form: AbstractControl): UntypedFormArray {
        return (form as UntypedFormGroup).controls.values as UntypedFormArray
    }
}
