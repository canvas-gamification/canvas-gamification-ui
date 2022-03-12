import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {TuiTiptapEditorService} from '@taiga-ui/addon-editor';
import Katex from 'katex';

@Component({
    selector: 'app-katex-tool',
    templateUrl: './katex-tool.component.html',
    styleUrls: ['./katex-tool.component.scss']
})
export class KatexToolComponent {

    @ViewChild('katexContent') katexContent: ElementRef;
    equation = '';
    katex;

    constructor(
        @Inject(TuiTiptapEditorService)
        private readonly editor: TuiTiptapEditorService
    ) {}

    displayKatex() {
        Katex.render(this.equation, this.katexContent.nativeElement, {
            throwOnError: false
        });
    }

    insertKatex() {
        console.log(this.katexContent.nativeElement);

        this.editor
            .getOriginTiptapEditor()
            .chain()
            .focus()
            .insertContent({
                type: 'math_inline',
                attrs: {
                    equation: this.equation
                }
            })
            .run();
    }
}
