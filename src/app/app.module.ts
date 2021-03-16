import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SampleQuestionsComponent } from './components/sample-questions/sample-questions.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { TopicsComponent } from './components/topics/topics.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConceptMapComponent } from './components/concept-map/concept-map.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { TokenValuesComponent } from './components/token-values/token-values.component';
import { LoginComponent } from './components/accounts/login';
import { ErrorInterceptor, JwtInterceptor } from '@app/_helpers';
import { CourseListComponent } from './components/course-list/course-list.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RecentUserActionsComponent } from './components/homepage/recent-user-actions/recent-user-actions.component';
import { UserActionsComponent } from './components/homepage/user-actions/user-actions.component';
import { RecentViewedQuestionsComponent } from './components/homepage/recent-viewed-questions/recent-viewed-questions.component';
import { CourseDashboardComponent } from './components/homepage/course-dashboard/course-dashboard.component';
import { InactiveCoursesComponent } from './components/homepage/inactive-courses/inactive-courses.component';
import { ProblemSetComponent } from './components/course/problem-set/problem-set.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RegisterComponent } from './components/accounts/register/register.component';
import { ProfileDetailsComponent } from './components/accounts/profile-details/profile-details.component';
import { ResetPasswordComponent } from './components/accounts/reset-password/reset-password.component';
import { ConsentFormComponent } from './components/accounts/consent-form/consent-form.component';
import { TermsAndConditionsSnippetComponent } from './components/accounts/terms-and-conditions-snippet/terms-and-conditions-snippet.component';
import { FaqComponent } from './components/faq/faq.component';
import { RegisterNameComponent } from './components/course/registration/register-name/register-name.component';
import { RegisterStudentNumberComponent } from './components/course/registration/register-student-number/register-student-number.component';
import { NameConfirmComponent } from './components/course/registration/name-confirm/name-confirm.component';
import { VerificationComponent } from './components/course/registration/verification/verification.component';
import { CourseComponent } from './components/course/course.component';
import { CourseEventsSnippetComponent } from './components/course/course-events-snippet/course-events-snippet.component';
import { TokenUseSnippetComponent } from './components/course/token-use-snippet/token-use-snippet.component';
import { ProgressBarComponent } from './components/course/progress-bar/progress-bar.component';
import { CourseQuestionSnippetComponent } from './components/course/course-question-snippet/course-question-snippet.component';

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
    CourseListComponent,
    TokenValuesComponent,
    FaqComponent,
    ProblemSetComponent,
    HomepageComponent,
    RecentUserActionsComponent,
    UserActionsComponent,
    RecentViewedQuestionsComponent,
    CourseDashboardComponent,
    InactiveCoursesComponent,
    RegisterComponent,
    ProfileDetailsComponent,
    ResetPasswordComponent,
    ConsentFormComponent,
    TermsAndConditionsSnippetComponent,
    RegisterNameComponent,
    RegisterStudentNumberComponent,
    NameConfirmComponent,
    VerificationComponent,
    CourseComponent,
    CourseEventsSnippetComponent,
    TokenUseSnippetComponent,
    ProgressBarComponent,
    CourseQuestionSnippetComponent,
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
        FontAwesomeModule,
        FormsModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressBarModule,
        MatTableModule,
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
