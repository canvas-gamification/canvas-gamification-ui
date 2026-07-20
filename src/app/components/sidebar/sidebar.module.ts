import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SidebarComponent} from './sidebar.component'
import {TuiScrollbar, TuiScrollable, TuiIcon, TuiButton, TuiHint} from '@taiga-ui/core'


@NgModule({
    declarations: [
        SidebarComponent
    ],
    exports: [
        SidebarComponent
    ],
    imports: [
        CommonModule,
        TuiButton,
        ...TuiHint,
        TuiScrollbar, TuiScrollable,
        TuiIcon
    ]
})
export class SidebarModule {
}
