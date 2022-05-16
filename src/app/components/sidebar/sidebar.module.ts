import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {TuiButtonModule, TuiDescribedByModule, TuiHintModule, TuiSvgModule} from '@taiga-ui/core';


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
        TuiSvgModule
    ]
})
export class SidebarModule {
}
