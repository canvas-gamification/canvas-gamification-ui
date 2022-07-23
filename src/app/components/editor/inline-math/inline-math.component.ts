import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild} from '@angular/core'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {TuiNodeViewNgComponent} from '@taiga-ui/addon-editor'
import {InlineMath} from '@app/components/editor/inline-math/inline-math.extension'
import {DOCUMENT} from '@angular/common'
import {GetKatexStringPipe} from '@app/_helpers/pipes/get-katex-string.pipe'

@Component({
    selector: 'editor-inline-math',
    templateUrl: './inline-math.component.html',
    styleUrls: ['./inline-math.component.scss'],
    providers: [TuiDestroyService, GetKatexStringPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineMathComponent extends TuiNodeViewNgComponent implements AfterViewInit {

    @ViewChild('katexContent') katexContainer: ElementRef

    constructor(
        @Inject(DOCUMENT) readonly documentRef: Document,
        @Inject(TuiDestroyService) readonly destroy$: TuiDestroyService,
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
