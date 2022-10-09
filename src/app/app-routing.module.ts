import {NgModule} from '@angular/core'
import {ExtraOptions, RouterModule, Routes} from '@angular/router'
import {LandingPageComponent} from './components/landing-page/landing-page.component'
import {SampleQuestionsComponent} from './components/sample-questions/sample-questions.component'
import {TopicsComponent} from './components/topics/topics.component'
import {TokenValuesComponent} from './components/token-values/token-values.component'
import {AuthGuard} from '@app/_helpers/auth.guard'
import {FaqComponent} from './components/faq/faq.component'
import {HomepageComponent} from './components/homepage/homepage.component'
import {UserActionsComponent} from '@app/components/homepage/user-actions/user-actions.component'
import {NotFoundComponent} from '@app/components/general/not-found/not-found.component'
import {ForbiddenComponent} from '@app/components/general/forbidden/forbidden.component'
import {AdminComponent} from '@app/admin/admin.component'
import {StatisticsComponent} from '@app/components/statistics/statistics.component'
import {UserStatsComponent} from '@app/components/user-stats/user-stats.component'

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
    scrollOffset: [0, 60]
}

const routes: Routes = [
    {path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule)},
    {path: 'problems', loadChildren: () => import('./problems/problems.module').then(m => m.ProblemsModule)},
    {path: 'course', loadChildren: () => import('./course/course.module').then(m => m.CourseModule)},
    {
        path: '',
        pathMatch: 'full',
        component: LandingPageComponent,
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sample-questions',
        component: SampleQuestionsComponent
    },
    {
        path: 'user-stats',
        component: UserStatsComponent
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
        path: 'homepage',
        component: HomepageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'contact',
        component: ContactComponent
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
        path: 'stats',
        component: StatisticsComponent
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
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'}), RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
