import { TuiTextfieldControllerModule, TuiTextareaModule, TuiInputModule } from "@taiga-ui/legacy";
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ContactComponent} from './contact.component'
import {ReactiveFormsModule} from "@angular/forms"
import { TuiFieldErrorPipe, TuiFieldErrorContentPipe } from "@taiga-ui/kit"
import { TuiError, TuiButton } from "@taiga-ui/core"
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
        TuiButton,
        TuiFieldErrorPipe, TuiFieldErrorContentPipe,
        TuiInputModule,
        TuiTextareaModule,
        TuiTextfieldControllerModule,
        TuiError
    ]
})
export class ContactModule {
}
