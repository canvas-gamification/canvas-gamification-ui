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
import { TopicsComponent } from './components/topics/topics.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConceptMapComponent } from './components/concept-map/concept-map.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { LoginComponent } from './components/accounts/login';
import {ErrorInterceptor, JwtInterceptor} from '@app/_helpers';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecentUserActionsComponent } from './components/homepage/recent-user-actions/recent-user-actions.component';
import { UserActionsComponent } from './components/homepage/user-actions/user-actions.component';
import { RecentViewedQuestionsComponent } from './components/homepage/recent-viewed-questions/recent-viewed-questions.component';

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
    HomepageComponent,
    NavbarComponent,
    RecentUserActionsComponent,
    UserActionsComponent,
    RecentViewedQuestionsComponent,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
