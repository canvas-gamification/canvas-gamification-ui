import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {TestCasesForm} from "@app/problems/_forms/json-editor/test-cases.form";
import {BaseEditorComponent} from "@app/problems/json-editor/base-editor/base-editor.component";
import {TestCaseEditor} from "@app/_models/json_editor";

@Component({
    selector: 'app-test-cases-editor',
    templateUrl: './test-cases-editor.component.html',
    styleUrls: ['./test-cases-editor.component.scss']
})
export class TestCasesEditorComponent implements OnInit, AfterViewInit {

    @Input() value: TestCaseEditor;
    @Output() readonly valueChange = new EventEmitter<TestCaseEditor>();

    form: FormGroup;
    @ViewChild('baseEditor') baseEditor: BaseEditorComponent;
    loadingValue = true;

    ngOnInit(): void {
        this.form = TestCasesForm.createTestCaseForm();

        this.form.valueChanges.subscribe(() => {
            this.valueChange.emit(this.form.getRawValue());
        });
    }

    ngAfterViewInit(): void {
        if (this.value) this.baseEditor.setFormFromString(JSON.stringify(this.value));
        this.loadingValue = false;
    }
}
