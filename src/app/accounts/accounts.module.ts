import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountsRoutingModule} from "@app/accounts/accounts-routing.module";
import {LoginComponent} from "@app/accounts/login";
import {RegisterComponent} from "@app/accounts/register/register.component";
import {ProfileDetailsComponent} from "@app/accounts/profile-details/profile-details.component";
import {ResetPasswordComponent} from "@app/accounts/reset-password/reset-password.component";
import {ConsentFormComponent} from "@app/accounts/consent-form/consent-form.component";
import {AdminTermsAndConditionsSnippetComponent} from "@app/accounts/admin-terms-and-conditions-snippet/admin-terms-and-conditions-snippet.component";
import {ActivationEmailComponent} from "@app/accounts/activation-email/activation-email.component";
import {ChangePasswordComponent} from "@app/accounts/change-password/change-password.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RecaptchaFormsModule, RecaptchaModule} from "ng-recaptcha";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ChangePasswordService} from "@app/accounts/_services/change-password.service";
import {ConsentService} from "@app/accounts/_services/consent.service";
import {ProfileDetailsService} from "@app/accounts/_services/profile-details.service";
import {RegisterService} from "@app/accounts/_services/register.service";
import {ResetPasswordService} from "@app/accounts/_services/reset-password.service";
import { StudentTermsAndConditionsSnippetComponent } from './student-terms-and-conditions-snippet/student-terms-and-conditions-snippet.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ProfileDetailsComponent,
        ResetPasswordComponent,
        ConsentFormComponent,
        AdminTermsAndConditionsSnippetComponent,
        ActivationEmailComponent,
        ChangePasswordComponent,
        StudentTermsAndConditionsSnippetComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AccountsRoutingModule,
        ReactiveFormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        ChangePasswordService,
        ConsentService,
        ProfileDetailsService,
        RegisterService,
        ResetPasswordService,
    ]
})
export class AccountsModule {
}
