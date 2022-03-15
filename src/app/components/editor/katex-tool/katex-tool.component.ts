import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {TuiTiptapEditorService} from '@taiga-ui/addon-editor';
import {GetKatexStringPipe} from '@app/_helpers/pipes/get-katex-string.pipe';

@Component({
    selector: 'app-katex-tool',
    templateUrl: './katex-tool.component.html',
    styleUrls: ['./katex-tool.component.scss'],
    providers: [GetKatexStringPipe]
})
export class KatexToolComponent {

    @ViewChild('katexContent') katexContent: ElementRef;
    equation = '';

    constructor(
        @Inject(TuiTiptapEditorService)
        private readonly editor: TuiTiptapEditorService,
        private getKatexStringPipe: GetKatexStringPipe
    ) {}

    displayKatex() {
        this.katexContent.nativeElement.innerHTML = this.getKatexStringPipe.transform(this.equation);
    }

    insertKatex() {
        this.editor
            .getOriginTiptapEditor()
            .chain()
            .focus()
            .insertContent({
                type: 'editor_inline_math',
                attrs: {
                    equation: this.equation
                }
            })
            .run();
    }
}
