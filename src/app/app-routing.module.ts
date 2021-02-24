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
import {RegisterNameComponent} from './components/course/registration/register-name/register-name.component';
import {CourseComponent} from '@app/components/course/course.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {UserActionsComponent} from '@app/components/homepage/user-actions/user-actions.component';


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
    canActivate: [AuthGuard]
  },
  {
    path: 'actions',
    component: UserActionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register/:courseId',
    component: RegisterNameComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'course/:courseId',
    component: CourseComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
