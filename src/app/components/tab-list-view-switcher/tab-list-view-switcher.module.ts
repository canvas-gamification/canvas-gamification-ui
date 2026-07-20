import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {TabListViewSwitcherComponent} from "./tab-list-view-switcher.component"
import {TuiRadioBlockModule} from "@taiga-ui/kit"
import {TuiGroupModule, TuiHintModule, TuiSvgModule} from "@taiga-ui/core"
import {ReactiveFormsModule} from "@angular/forms"

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiGroupModule,
        TuiHintModule,
        TuiRadioBlockModule,
        TuiSvgModule,
    ],
    declarations: [TabListViewSwitcherComponent],
    exports: [TabListViewSwitcherComponent],
})
export class TabListViewSwitcherModule {
}
