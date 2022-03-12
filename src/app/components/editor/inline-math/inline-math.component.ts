import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {TuiNodeViewNgComponent} from '@taiga-ui/addon-editor';
import {InlineMath} from '@app/components/editor/inline-math/inline-math.extension';
import katex from 'katex';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-inline-math',
    templateUrl: './inline-math.component.html',
    styleUrls: ['./inline-math.component.scss'],
    providers: [TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineMathComponent extends TuiNodeViewNgComponent implements AfterViewInit {

    @ViewChild('katexContent') katexContainer: ElementRef;

    get attrs(): InlineMath {
        return (this.node?.attrs as InlineMath) || {equation: ''};
    }

    constructor(
        @Inject(DOCUMENT) readonly documentRef: Document,
        @Inject(TuiDestroyService) readonly destroy$: TuiDestroyService,
    ) {
        super();
    }

    ngAfterViewInit(): void {
        katex.render(this.attrs.equation, this.katexContainer.nativeElement, {
            throwOnError: false
        });
    }
}
