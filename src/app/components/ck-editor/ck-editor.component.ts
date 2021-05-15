import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as ClassicEditor from "@canvas-gamification/ckeditor5";

@Component({
    selector: 'app-ck-editor',
    templateUrl: './ck-editor.component.html',
    styleUrls: ['./ck-editor.component.scss']
})
export class CkEditorComponent {
    @Input() value: string;
    @Output() readonly valueChange = new EventEmitter<string>();
    public ckEditor = ClassicEditor;

    changeValue(value: string): void {
        this.valueChange.emit(value);
    }

}
