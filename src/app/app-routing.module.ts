import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './components/contact/contact.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SampleQuestionsComponent} from './components/sample-questions/sample-questions.component';
import {TopicsComponent} from './components/topics/topics.component';
import {ConceptMapComponent} from './components/concept-map/concept-map.component';
import {UserStatsComponent} from './components/user-stats/user-stats.component';
import {LoginComponent} from '@app/components/accounts/login';
import {AuthGuard} from '@app/_helpers/auth.guard';
import {ProblemSetComponent} from '@app/components/course/problem-set/problem-set.component';

import {HomepageComponent} from './components/homepage/homepage.component';
import {UserActionsComponent} from '@app/components/homepage/user-actions/user-actions.component';
import {ProblemViewComponent} from '@app/components/course/problem-view/problem-view.component';
import {ProblemEditComponent} from '@app/components/course/problem-edit/problem-edit.component';


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
    canActivate: [ AuthGuard ]
  },
  {
    path: 'actions',
    component: UserActionsComponent
  },
  {
    path: 'course/problem-set',
    component: ProblemSetComponent
  },
  {
    path: 'course/question/:id',
    component: ProblemViewComponent
  },
  {
    path: 'course/edit/:id',
    component: ProblemEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
