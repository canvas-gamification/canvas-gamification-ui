import {Component, OnInit, ViewChild} from '@angular/core';
import 'ace-builds/src-noconflict/ext-language_tools';

@Component({
    selector: 'app-ace',
    templateUrl: './ace.component.html',
    styleUrls: ['./ace.component.scss']
})
export class AceComponent implements OnInit {

    text: string;
    @ViewChild('editor') editor;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.editor.setTheme('monokai');
        this.editor.setMode('java');
        this.editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            tabSize: 4,
            useSoftTabs: true,
        });
    }
}
