import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from "@app/accounts/login";
import {RegisterComponent} from "@app/accounts/register/register.component";
import {ProfileDetailsComponent} from "@app/accounts/profile-details/profile-details.component";
import {AuthGuard} from "@app/_helpers/auth.guard";
import {ChangePasswordComponent} from "@app/accounts/change-password/change-password.component";
import {ResetPasswordComponent} from "@app/accounts/reset-password/reset-password.component";
import {ConsentFormComponent} from "@app/accounts/consent-form/consent-form.component";
import {ActivationEmailComponent} from "@app/accounts/activation-email/activation-email.component";


const routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileDetailsComponent, canActivate: [AuthGuard]},
    {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
    {path: 'reset-password', component: ResetPasswordComponent},
    {path: 'reset-password/:uid/:token', component: ResetPasswordComponent},
    {path: 'consent-form', component: ConsentFormComponent, canActivate: [AuthGuard]},
    {path: 'activate/:uuid/:token', component: ActivationEmailComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule {
}
