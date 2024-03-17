import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SidebarComponent} from './sidebar.component'
import {TuiButtonModule, TuiDescribedByModule, TuiHintModule, TuiScrollbarModule, TuiSvgModule} from '@taiga-ui/core'


@NgModule({
    declarations: [
        SidebarComponent
    ],
    exports: [
        SidebarComponent
    ],
    imports: [
        CommonModule,
        TuiButtonModule,
        TuiDescribedByModule,
        TuiHintModule,
        TuiScrollbarModule,
        TuiSvgModule
    ]
})
export class SidebarModule {
}
