import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
    selector: 'app-ck-editor',
    templateUrl: './ck-editor.component.html',
    styleUrls: ['./ck-editor.component.scss']
})
export class CkEditorComponent implements OnInit {
    @Input() value: string;
    @Output() readonly valueChange = new EventEmitter<string>();
    public ckEditor = ClassicEditor;
    configOptions: any;

    constructor() {
    }

    ngOnInit(): void {

    }

    changeValue(value: string): void {
        this.valueChange.emit(value);
    }

}
