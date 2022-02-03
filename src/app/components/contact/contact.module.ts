import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactComponent} from './contact.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TuiFieldErrorModule, TuiInputModule, TuiTextAreaModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {RecaptchaFormsModule, RecaptchaModule} from "ng-recaptcha";

@NgModule({
    declarations: [ContactComponent],
    exports: [
        ContactComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiFieldErrorModule,
        TuiTextAreaModule,
        TuiButtonModule,
        TuiTextfieldControllerModule,
        RecaptchaFormsModule,
        RecaptchaModule
    ]
})
export class ContactModule {
}
