import {Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import * as ClassicEditor from "@canvas-gamification/ckeditor5";
import {ChangeEvent, CKEditorComponent} from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
    selector: 'app-ck-editor',
    templateUrl: './ck-editor.component.html',
    styleUrls: ['./ck-editor.component.scss']
})
export class CkEditorComponent implements OnChanges {
    @Input() readOnly = false;
    @Input() value: string;
    @Output() readonly valueChange = new EventEmitter<string>();
    public ckEditor = ClassicEditor;
    @ViewChild('editor') editorComponent: CKEditorComponent;

    ngOnChanges(): void {
        this.editorComponent?.editorInstance?.setData(this.value);
    }

    /**
     * Emitter for when the text in the editor is changed.
     * @param editor - The CKEditor event called when the text changes.
     */
    changeValue({editor}: ChangeEvent): void {
        this.valueChange.emit(editor.getData());
    }
}
