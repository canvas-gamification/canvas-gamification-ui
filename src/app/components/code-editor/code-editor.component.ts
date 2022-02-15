import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {basicSetup, EditorState} from '@codemirror/basic-setup';
import {java} from '@codemirror/lang-java';
import {EditorView, keymap, ViewUpdate} from '@codemirror/view';
import {indentWithTab} from '@codemirror/commands';
import {oneDark} from "@codemirror/theme-one-dark";
import {indentUnit} from "@codemirror/language";

@Component({
    selector: 'app-code-editor',
    templateUrl: './code-editor.component.html',
    styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit {

    @Input() codeTemplate: string;
    @Output() readonly codeTemplateChange = new EventEmitter<string>();

    @Input() showHelp = true;
    @Input() fixedHeight: string;

    @ViewChild('codeEditor') codeEditorElement: ElementRef;
    editor: EditorView;

    ngAfterViewInit(): void {
        const maxHeightEditor = EditorView.theme({
            '&': {maxHeight: '30rem'},
            '.cm-scroller': {
                overflow: 'auto'
            }
        });
        const fixedHeightEditor = EditorView.theme({
            '&': {height: this.fixedHeight},
            '.cm-scroller': {
                overflow: 'auto'
            }
        });

        this.editor = new EditorView({
            state: EditorState.create({
                doc: this.codeTemplate,
                extensions: [
                    basicSetup,
                    keymap.of([indentWithTab]),
                    indentUnit.of('    '),
                    oneDark,
                    java(),
                    this.fixedHeight ? fixedHeightEditor : maxHeightEditor,
                    EditorView.updateListener.of((update: ViewUpdate) => {
                        this.codeTemplateChange.emit(update.state.doc['text'].join('\n'));
                    })
                ]
            }),
            parent: this.codeEditorElement.nativeElement
        });
    }
}
