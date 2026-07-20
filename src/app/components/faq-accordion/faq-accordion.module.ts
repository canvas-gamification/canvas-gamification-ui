import { TuiFilterPipe } from "@taiga-ui/cdk";
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FaqAccordionComponent} from './faq-accordion.component'
import { TuiAccordion, TuiAvatar } from "@taiga-ui/kit"
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
        ...TuiAccordion,
        TuiFilterPipe,
        TuiAvatar
    ]
})
export class FaqAccordionModule {
}
