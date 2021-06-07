import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './components/contact/contact.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SampleQuestionsComponent} from './components/sample-questions/sample-questions.component';
import {TopicsComponent} from './components/topics/topics.component';
import {TokenValuesComponent} from './components/token-values/token-values.component';
import {UserStatsComponent} from './components/user-stats/user-stats.component';
import {AuthGuard} from '@app/_helpers/auth.guard';
import {ProblemSetComponent} from '@app/components/problems/problem-set/problem-set.component';
import {FaqComponent} from './components/faq/faq.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {CourseListComponent} from '@app/components/course/course-list/course-list.component';
import {CourseComponent} from '@app/components/course/course.component';
import {UserActionsComponent} from '@app/components/homepage/user-actions/user-actions.component';
import {CourseEventCreateEditComponent} from '@app/components/course/course-event-create/course-event-create-edit.component';
import {CourseQuestionSnippetComponent} from '@app/components/course/course-question-snippet/course-question-snippet.component';
import {CourseRegisterComponent} from '@app/components/course/course-registration/course-register.component';
import {ProblemViewComponent} from '@app/components/problems/problem-view/problem-view.component';
import {ProblemEditComponent} from '@app/components/problems/problem-edit/problem-edit.component';
import {ProblemCreateComponent} from '@app/components/problems/problem-create/problem-create.component';
import {SubmissionViewComponent} from '@app/components/problems/submission-view/submission-view.component';
import {NotFoundComponent} from '@app/components/general/not-found/not-found.component';
import {ForbiddenComponent} from '@app/components/general/forbidden/forbidden.component';


const routes: Routes = [
    { path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) },
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
        path: 'token-values',
        component: TokenValuesComponent
    },
    {
        path: 'course/:courseId/category/:categoryId',
        component: UserStatsComponent
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
        path: 'course',
        pathMatch: 'full',
        component: CourseListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'course/register/:courseId',
        component: CourseRegisterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'course/view/:courseId',
        component: CourseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'course/:courseId/new-event',
        component: CourseEventCreateEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'course/:courseId/new-event/:eventId',
        component: CourseEventCreateEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'course/:courseId/event/:eventId',
        component: CourseQuestionSnippetComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'problems',
        component: ProblemSetComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'problem/:id',
        component: ProblemViewComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'course/:courseId',
        children: [
            {path: 'problem/:id', component: ProblemViewComponent},
            {path: 'event/:eventId/problem/:id', component: ProblemViewComponent}
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'problem/:id/edit',
        component: ProblemEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'problem/create/:type',
        component: ProblemCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'problem/submission/:id',
        component: SubmissionViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '403',
        component: ForbiddenComponent
    },
    {
        // KEEP THIS ROUTE AT THE END
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
