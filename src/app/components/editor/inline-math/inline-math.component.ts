import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild} from '@angular/core'
import {TuiNodeViewNg} from '@taiga-ui/editor'
import {NodeViewProps} from '@tiptap/core'
import {InlineMath} from '@app/components/editor/inline-math/inline-math.extension'
import {DOCUMENT} from '@angular/common'
import {GetKatexStringPipe} from '@app/_helpers/pipes/get-katex-string.pipe'

@Component({
    selector: 'editor-inline-math',
    templateUrl: './inline-math.component.html',
    styleUrls: ['./inline-math.component.scss'],
    providers: [GetKatexStringPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InlineMathComponent extends TuiNodeViewNg implements AfterViewInit {

    @ViewChild('katexContent') katexContainer: ElementRef

    private nodeValue: NodeViewProps['node']

    get node(): NodeViewProps['node'] {
        return this.nodeValue
    }

    set node(value: NodeViewProps['node']) {
        this.nodeValue = value
        this.renderEquation()
    }

    constructor(
        @Inject(DOCUMENT) readonly documentRef: Document,
        private getKatexStringPipe: GetKatexStringPipe
    ) {
        super()
    }

    get attrs(): InlineMath {
        return (this.node?.attrs as InlineMath) || {equation: ''}
    }

    renderEquation(): void {
        if (this.katexContainer?.nativeElement) {
            this.katexContainer.nativeElement.innerHTML = this.getKatexStringPipe.transform(this.attrs.equation)
        }
    }

    ngAfterViewInit(): void {
        this.renderEquation()
    }
}
