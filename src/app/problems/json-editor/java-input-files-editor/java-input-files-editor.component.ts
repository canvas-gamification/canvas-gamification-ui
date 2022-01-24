import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {BaseEditorComponent} from "@app/problems/json-editor/base-editor/base-editor.component";
import {JavaInputFilesForm} from "@app/problems/_forms/json-editor/java-input-files.form";
import {JavaInputFileEditor} from "@app/_models/json_editor";

@Component({
    selector: 'app-java-input-files-editor',
    templateUrl: './java-input-files-editor.component.html',
    styleUrls: ['./java-input-files-editor.component.scss']
})
export class JavaInputFilesEditorComponent implements OnInit, AfterViewInit {

    @Input() value: JavaInputFileEditor;
    @Output() readonly valueChange = new EventEmitter<JavaInputFileEditor>();

    form: FormGroup;
    @ViewChild('baseEditor') baseEditor: BaseEditorComponent;
    loadingValue = true;

    ngOnInit(): void {
        this.form = JavaInputFilesForm.createJavaInputFileForm();

        this.form.valueChanges.subscribe(() => {
            this.valueChange.emit(this.form.getRawValue());
        });
    }

    ngAfterViewInit(): void {
        if (this.value) this.baseEditor.setFormFromString(JSON.stringify(this.value));
        this.loadingValue = false;
    }
}
