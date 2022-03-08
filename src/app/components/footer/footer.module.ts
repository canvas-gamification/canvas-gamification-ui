import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer.component';
import {TuiLinkModule} from "@taiga-ui/core";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        FooterComponent
    ],
    exports: [
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        TuiLinkModule
    ]
})
export class FooterModule {
}
