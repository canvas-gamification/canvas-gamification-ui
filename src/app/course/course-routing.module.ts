import {AuthGuard} from "@app/_helpers/auth.guard"
import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {CourseListComponent} from "@app/course/course-list/course-list.component"
import {CourseRegisterComponent} from "@app/course/course-registration/course-register.component"
import {CourseComponent} from "@app/course/course.component"
import {CourseEventCreateEditComponent} from "@app/course/course-event-create/course-event-create-edit.component"
import {CourseQuestionSnippetComponent} from "@app/course/course-question-snippet/course-question-snippet.component"
import {ProblemViewComponent} from "@app/problems/problem-view/problem-view.component"
import {PracticeProblemComponent} from "@app/course/practice-problem/practice-problem.component"
import {GoalPageComponent} from "@app/course/goal/goal-page/goal-page.component"
import {GoalCreateComponent} from "@app/course/goal/goal-create/goal-create.component"
import {GoalComponent} from "@app/course/goal/goal/goal.component"
import {CoursePracticeComponent} from "@app/course/course-practice/course-practice.component"
import {
    CoursePracticeConceptMapComponent
} from "@app/course/course-practice-concept-map/course-practice-concept-map.component"
import {TokenUseSnippetComponent} from "@app/course/token-use-snippet/token-use-snippet.component"
import {CourseChallengeSnippetComponent} from "@app/course/course-challenge-snippet/course-challenge-snippet.component"
import {CourseHomepageComponent} from "@app/course/course-homepage/course-homepage.component"
import {CourseEventsSnippetComponent} from "@app/course/course-events-snippet/course-events-snippet.component"

const routes: Routes = [
    {
        path: '',
        component: CourseListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':courseId',
        component: CourseComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: CourseHomepageComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'practice',
                component: CoursePracticeComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'practice/concept-map',
                component: CoursePracticeConceptMapComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'register',
                component: CourseRegisterComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'event',
                component: CourseEventsSnippetComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'new-event',
                component: CourseEventCreateEditComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'new-event/:eventId',
                component: CourseEventCreateEditComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'event/:eventId',
                component: CourseQuestionSnippetComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'problem/:id',
                component: ProblemViewComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'event/:eventId/problem/:id',
                component: ProblemViewComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'practice/category/:categoryId',
                component: PracticeProblemComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'goal',
                component: GoalPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'goal/create',
                component: GoalCreateComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'goal/:goalId',
                component: GoalComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'token',
                component: TokenUseSnippetComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'challenges',
                component: CourseChallengeSnippetComponent,
                canActivate: [AuthGuard]
            }]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule {
}
