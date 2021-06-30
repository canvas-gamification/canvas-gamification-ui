import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as ClassicEditor from "@canvas-gamification/ckeditor5";
import {ChangeEvent} from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
    selector: 'app-ck-editor',
    templateUrl: './ck-editor.component.html',
    styleUrls: ['./ck-editor.component.scss']
})
export class CkEditorComponent {
    @Input() value: string;
    @Output() readonly valueChange = new EventEmitter<string>();
    public ckEditor = ClassicEditor;

    /**
     * Emitter for when the text in the editor is changed.
     * @param editor - The CKEditor event called when the text changes.
     */
    changeValue({editor}: ChangeEvent): void {
        this.valueChange.emit(editor.getData());
    }
}
