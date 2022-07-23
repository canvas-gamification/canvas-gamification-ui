import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FaqAccordionComponent} from './faq-accordion.component'
import {TuiAccordionModule, TuiMarkerIconModule} from "@taiga-ui/kit"
import {TuiFilterPipeModule} from "@taiga-ui/cdk"


@NgModule({
    declarations: [FaqAccordionComponent],
    exports: [
        FaqAccordionComponent
    ],
    imports: [
        CommonModule,
        TuiAccordionModule,
        TuiFilterPipeModule,
        TuiMarkerIconModule
    ]
})
export class FaqAccordionModule {
}
