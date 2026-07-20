import {TuiTextarea} from "@taiga-ui/kit"
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ContactComponent} from './contact.component'
import {ReactiveFormsModule} from "@angular/forms"
import {TuiError, TuiButton, TuiInput} from "@taiga-ui/core"
import {RecaptchaFormsModule, RecaptchaModule} from "ng-recaptcha-2"

@NgModule({
    declarations: [ContactComponent],
    exports: [
        ContactComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecaptchaFormsModule,
        RecaptchaModule,
        TuiButton,
        ...TuiError,
        ...TuiInput,
        ...TuiTextarea
    ]
})
export class ContactModule {
}
