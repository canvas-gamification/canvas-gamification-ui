import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { TopicsComponent } from './components/topics/topics.component';


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
    path: 'topics',
    component: TopicsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
