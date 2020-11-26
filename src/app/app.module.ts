import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// For dummy topics API setup
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './fake-api-service/in-memory-data.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ContactComponent } from './components/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactService } from './services/contact.service';
import { HeaderComponent } from './components/header/header.component';
import { SampleQuestionsComponent } from './components/sample-questions/sample-questions.component';
import { MatCardModule } from '@angular/material/card';
import { TopicsComponent } from './components/topics/topics.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ConceptMapComponent } from './components/concept-map/concept-map.component';

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
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    MatCardModule
  ],
  providers: [
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
