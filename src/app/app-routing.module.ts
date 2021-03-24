import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './components/contact/contact.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SampleQuestionsComponent} from './components/sample-questions/sample-questions.component';
import {TopicsComponent} from './components/topics/topics.component';
import {ConceptMapComponent} from './components/concept-map/concept-map.component';
import {TokenValuesComponent} from './components/token-values/token-values.component';
import {UserStatsComponent} from './components/user-stats/user-stats.component';
import {LoginComponent} from '@app/components/accounts/login';
import {AuthGuard} from '@app/_helpers/auth.guard';
import {ProblemSetComponent} from '@app/components/course/problem-set/problem-set.component';
import {RegisterComponent} from './components/accounts/register/register.component';
import {ProfileDetailsComponent} from './components/accounts/profile-details/profile-details.component';
import {ResetPasswordComponent} from './components/accounts/reset-password/reset-password.component';
import {ConsentFormComponent} from '@app/components/accounts/consent-form/consent-form.component';
import {FaqComponent} from './components/faq/faq.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {UserActionsComponent} from '@app/components/homepage/user-actions/user-actions.component';
import {ProblemViewComponent} from '@app/components/course/problem-view/problem-view.component';
import {ProblemEditComponent} from '@app/components/course/problem-edit/problem-edit.component';
import {ProblemDeleteComponent} from '@app/components/course/problem-delete/problem-delete.component';
import {ProblemCreateComponent} from '@app/components/course/problem-create/problem-create.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LandingPageComponent,
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'sample-questions',
        component: SampleQuestionsComponent
    },
    {
        path: 'topics',
        component: TopicsComponent
    },
    {
        path: 'concept-map',
        component: ConceptMapComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'token-values',
        component: TokenValuesComponent
    },
    {
        path: 'user-stats',
        component: UserStatsComponent
    },
    {
        path: 'accounts/login',
        component: LoginComponent
    },
    {
        path: 'homepage',
        component: HomepageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'actions',
        component: UserActionsComponent
    },
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'accounts/register',
        component: RegisterComponent
    },
    {
        path: 'accounts/profile',
        component: ProfileDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'accounts/reset-password',
        component: ResetPasswordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'accounts/consent-form',
        component: ConsentFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'course/problem-set',
        component: ProblemSetComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'course/question/:id',
        component: ProblemViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'course/question/edit/:id',
        component: ProblemEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'course/question/delete/:id',
        component: ProblemDeleteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'course/question/create/:type',
        component: ProblemCreateComponent,
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
