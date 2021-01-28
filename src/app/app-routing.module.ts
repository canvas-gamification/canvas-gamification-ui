import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './components/contact/contact.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SampleQuestionsComponent} from './components/sample-questions/sample-questions.component';
import {TopicsComponent} from './components/topics/topics.component';
import {ConceptMapComponent} from './components/concept-map/concept-map.component';
import {TokenValuesComponent} from './components/token-values/token-values.component';
import {UserStatsComponent} from './components/user-stats/user-stats.component';
import {LoginComponent} from './components/accounts/login';
import {AuthGuard} from './_helpers/auth.guard';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
