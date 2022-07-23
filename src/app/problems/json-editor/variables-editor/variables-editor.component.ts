import {Component, OnDestroy} from '@angular/core'
import {AbstractControl, FormArray, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms"
import {VariablesForm} from "@app/problems/_forms/json-editor/variables.form"
import {VariableEditorTypes} from "@app/_models/json_editor"
import {AbstractEditorComponent} from "@app/problems/json-editor/abstract-editor/abstract-editor.component"
import {DragulaService} from 'ng2-dragula'

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
    ]
})
export class VariablesEditorComponent extends AbstractEditorComponent implements OnDestroy {

    openNewValueDropdown = false
    modelTypes: VariableEditorTypes[] = ['int', 'float', 'choice', 'expression', 'enum']
    dragulaName = 'variables'

    constructor(private dragulaService: DragulaService) {
        super()
        dragulaService.destroy(this.dragulaName)
        dragulaService.createGroup(this.dragulaName, {
            moves: (el, container, handle) => {
                return !!handle.closest('.drag-container_handle')
            }
        })
    }

    onDragulaChange(change: []): void {
        this.models.clear()
        change.forEach(value => {
            this.models.push(value)
        })
    }

    ngOnDestroy() {
        super.ngOnDestroy()
        this.dragulaService.destroy(this.dragulaName)
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

    getValues(form: AbstractControl): FormArray {
        return (form as FormGroup).controls.values as FormArray
    }
}
