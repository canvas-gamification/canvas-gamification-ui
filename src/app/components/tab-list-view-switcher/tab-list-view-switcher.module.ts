import {TuiBlock} from "@taiga-ui/kit"
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {TabListViewSwitcherComponent} from "./tab-list-view-switcher.component"
import {TuiGroup, TuiIcon, TuiHint, TuiRadio} from "@taiga-ui/core"
import {ReactiveFormsModule} from "@angular/forms"

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiGroup,
        ...TuiHint,
        TuiBlock, ...TuiRadio,
        TuiIcon,
    ],
    declarations: [TabListViewSwitcherComponent],
    exports: [TabListViewSwitcherComponent],
})
export class TabListViewSwitcherModule {
}
