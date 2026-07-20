import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ContactComponent} from './contact.component'
import {ReactiveFormsModule} from "@angular/forms"
import { TuiInputModule, TuiTextareaModule, TuiFieldErrorPipeModule } from "@taiga-ui/kit"
import { TuiButtonModule, TuiTextfieldControllerModule, TuiErrorModule } from "@taiga-ui/core"
import {RecaptchaFormsModule, RecaptchaModule} from "ng-recaptcha"

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
        TuiButtonModule,
        TuiFieldErrorPipeModule,
        TuiInputModule,
        TuiTextareaModule,
        TuiTextfieldControllerModule,
        TuiErrorModule
    ]
})
export class ContactModule {
}
