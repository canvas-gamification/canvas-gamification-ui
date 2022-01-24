import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {VariablesForm} from "@app/problems/_forms/json-editor/variables.form";
import {BaseEditorComponent} from "@app/problems/json-editor/base-editor/base-editor.component";
import {
    VariableEditorChoice,
    VariableEditorEnumerator,
    VariableEditorExpression,
    VariableEditorFloat,
    VariableEditorInteger,
    VariableEditorTypes
} from "@app/_models/json_editor";

@Component({
    selector: 'app-variable-editor',
    templateUrl: './variable-editor.component.html',
    styleUrls: ['./variable-editor.component.scss']
})
export class VariableEditorComponent implements OnInit, AfterViewInit {

    @Input() value: VariableEditorInteger | VariableEditorEnumerator | VariableEditorExpression | VariableEditorFloat | VariableEditorChoice;
    @Output() readonly valueChange = new EventEmitter<VariableEditorInteger | VariableEditorEnumerator | VariableEditorExpression | VariableEditorFloat | VariableEditorChoice>();
    @Input() type!: VariableEditorTypes;

    form: FormGroup;
    @ViewChild('baseEditor') baseEditor: BaseEditorComponent;
    loadingValue = true;

    ngOnInit(): void {
        this.form = VariablesForm.getNewVariableForm(this.type);

        this.form.valueChanges.subscribe(() => {
            this.valueChange.emit(this.form.getRawValue());
        });
    }

    ngAfterViewInit(): void {
        if (this.value) this.baseEditor.setFormFromString(JSON.stringify(this.value));
        this.loadingValue = false;
    }

    addNewValue(): void {
        this.getValues()?.push(VariablesForm.createValuesControl());
    }

    removeValue(index: number): void {
        this.getValues()?.removeAt(index);
    }

    getValues(): FormArray {
        return this.form.controls.values as FormArray;
    }
}
