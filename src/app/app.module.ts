import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProblemSetComponent} from './problem-set/problem-set.component';
import {MessagesComponent} from './messages/messages.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {ContactComponent} from './components/contact/contact.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ContactService} from './services/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    ProblemSetComponent,
    MessagesComponent,
    NavBarComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
