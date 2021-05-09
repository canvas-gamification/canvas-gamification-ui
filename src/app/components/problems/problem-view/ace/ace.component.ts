import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import 'ace-builds/src-noconflict/ext-language_tools';
import { config } from 'ace-builds';

@Component({
    selector: 'app-ace',
    templateUrl: './ace.component.html',
    styleUrls: ['./ace.component.scss']
})
export class AceComponent implements AfterViewInit {
    @Input() template;
    @Output() readonly templateChange = new EventEmitter<string>();
    text: string;
    @ViewChild('editor') editor;

    ngAfterViewInit(): void {
        // Temporary fix the base path error of ace editor
        // Currently no solutions could be found
        config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/')

        this.editor.setTheme('monokai');
        this.editor.setMode('java');
        this.editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            tabSize: 4,
            useSoftTabs: true,
            useWorker: false,
        });
        this.addNewCodeItem(this.template);
    }

    addNewCodeItem(value: string): void {
        this.templateChange.emit(value);
    }
}
