import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {BaseEditorComponent} from "@app/problems/json-editor/base-editor/base-editor.component";
import {ParsonsInputFilesForm} from "@app/problems/_forms/json-editor/parsons-input-files.form";
import {ParsonsInputFileEditor} from "@app/_models/json_editor";

@Component({
    selector: 'app-parsons-input-files-editor',
    templateUrl: './parsons-input-files-editor.component.html',
    styleUrls: ['./parsons-input-files-editor.component.scss']
})
export class ParsonsInputFilesEditorComponent implements OnInit, AfterViewInit {

    @Input() value: ParsonsInputFileEditor;
    @Output() readonly valueChange = new EventEmitter<ParsonsInputFileEditor>();

    form: FormGroup;
    @ViewChild('baseEditor') baseEditor: BaseEditorComponent;
    loadingValue = true;

    ngOnInit(): void {
        this.form = ParsonsInputFilesForm.createParsonsInputFileForm();

        this.form.valueChanges.subscribe(() => {
            this.valueChange.emit(this.form.getRawValue());
        });
    }

    ngAfterViewInit(): void {
        if (this.value) this.baseEditor.setFormFromString(JSON.stringify(this.value));
        this.loadingValue = false;
    }

    addNewLine(): void {
        this.getLines()?.push(ParsonsInputFilesForm.createLinesControl());
    }

    removeLine(index: number): void {
        this.getLines()?.removeAt(index);
    }

    getLines(): FormArray {
        return this.form.controls.lines as FormArray;
    }
}
