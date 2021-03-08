import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MessagesComponent} from './components/messages/messages.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {ContactComponent} from './components/contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {SampleQuestionsComponent} from './components/sample-questions/sample-questions.component';
import {MatCardModule} from '@angular/material/card';
import {TopicsComponent} from './components/topics/topics.component';
import {RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ConceptMapComponent} from './components/concept-map/concept-map.component';
import {UserStatsComponent} from './components/user-stats/user-stats.component';
import {TokenValuesComponent} from './components/token-values/token-values.component';
import {LoginComponent} from './components/accounts/login';
import {ErrorInterceptor, JwtInterceptor} from '@app/_helpers';
import {HomepageComponent} from './components/homepage/homepage.component';
import {RecentUserActionsComponent} from './components/homepage/recent-user-actions/recent-user-actions.component';
import {UserActionsComponent} from './components/homepage/user-actions/user-actions.component';
import {RecentViewedQuestionsComponent} from './components/homepage/recent-viewed-questions/recent-viewed-questions.component';
import {CourseDashboardComponent} from './components/homepage/course-dashboard/course-dashboard.component';
import {InactiveCoursesComponent} from './components/homepage/inactive-courses/inactive-courses.component';
import {RegisterComponent} from './components/accounts/register/register.component';
import {ProfileDetailsComponent} from './components/accounts/profile-details/profile-details.component';
import {ResetPasswordComponent} from './components/accounts/reset-password/reset-password.component';
import {ConsentFormComponent} from './components/accounts/consent-form/consent-form.component';
import {TermsAndConditionsSnippetComponent} from './components/accounts/terms-and-conditions-snippet/terms-and-conditions-snippet.component';
import {FaqComponent} from './components/faq/faq.component';
import {ProblemSetComponent} from './components/course/problem-set/problem-set.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ProblemViewComponent} from './components/course/problem-view/problem-view.component';
import {ProblemEditComponent} from './components/course/problem-edit/problem-edit.component';
import {CommonModule} from '@angular/common';
import {ProblemDeleteComponent} from './components/course/problem-delete/problem-delete.component';
import {ProblemCreateComponent} from './components/course/problem-create/problem-create.component';
import {DragulaModule} from 'ng2-dragula';

@NgModule({
    declarations: [
        AppComponent,
        MessagesComponent,
        LandingPageComponent,
        ContactComponent,
        HeaderComponent,
        TopicsComponent,
        SampleQuestionsComponent,
        ConceptMapComponent,
        UserStatsComponent,
        LoginComponent,
        TokenValuesComponent,
        FaqComponent,
        ProblemSetComponent,
        HomepageComponent,
        RecentUserActionsComponent,
        UserActionsComponent,
        RecentViewedQuestionsComponent,
        CourseDashboardComponent,
        InactiveCoursesComponent,
        ProblemViewComponent,
        ProblemEditComponent,
        ProblemDeleteComponent,
        RegisterComponent,
        ProfileDetailsComponent,
        ResetPasswordComponent,
        ConsentFormComponent,
        TermsAndConditionsSnippetComponent,
        ProblemCreateComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatCardModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        MatCardModule,
        FontAwesomeModule,
        FormsModule,
        MatPaginatorModule,
        CommonModule,
        DragulaModule.forRoot(),
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
