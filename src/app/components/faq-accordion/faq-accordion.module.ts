import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FaqAccordionComponent} from './faq-accordion.component'
import {TuiAccordionModule, TuiMarkerIconModule} from "@taiga-ui/kit"
import {TuiFilterPipeModule} from "@taiga-ui/cdk"
import {EditorModule} from "@app/components/editor/editor.module"
import {FormsModule} from "@angular/forms"


@NgModule({
    declarations: [FaqAccordionComponent],
    exports: [
        FaqAccordionComponent
    ],
    imports: [
        CommonModule,
        EditorModule,
        FormsModule,
        TuiAccordionModule,
        TuiFilterPipeModule,
        TuiMarkerIconModule
    ]
})
export class FaqAccordionModule {
}
