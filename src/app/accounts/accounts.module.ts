import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountsRoutingModule} from "@app/accounts/accounts-routing.module";
import {LoginComponent} from "@app/accounts/login";
import {RegisterComponent} from "@app/accounts/register/register.component";
import {ProfileDetailsComponent} from "@app/accounts/profile-details/profile-details.component";
import {ResetPasswordComponent} from "@app/accounts/reset-password/reset-password.component";
import {ConsentFormComponent} from "@app/accounts/consent-form/consent-form.component";
import {TermsAndConditionsSnippetComponent} from "@app/accounts/terms-and-conditions-snippet/terms-and-conditions-snippet.component";
import {ActivationEmailComponent} from "@app/accounts/activation-email/activation-email.component";
import {ChangePasswordComponent} from "@app/accounts/change-password/change-password.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RecaptchaFormsModule, RecaptchaModule} from "ng-recaptcha";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ProfileDetailsComponent,
        ResetPasswordComponent,
        ConsentFormComponent,
        TermsAndConditionsSnippetComponent,
        ActivationEmailComponent,
        ChangePasswordComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AccountsRoutingModule,
        ReactiveFormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        MatProgressSpinnerModule,
    ]
})
export class AccountsModule {
}
