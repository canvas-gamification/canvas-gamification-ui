import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TabListViewSwitcherComponent} from "./tab-list-view-switcher.component";
import {TuiRadioBlockModule} from "@taiga-ui/kit";
import {TuiDescribedByModule, TuiGroupModule, TuiHintModule, TuiSvgModule} from "@taiga-ui/core";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        TuiRadioBlockModule,
        TuiGroupModule,
        TuiHintModule,
        TuiSvgModule,
        ReactiveFormsModule,
        TuiDescribedByModule
    ],
    declarations: [TabListViewSwitcherComponent],
    exports: [TabListViewSwitcherComponent],
})
export class TabListViewSwitcherModule {
}
