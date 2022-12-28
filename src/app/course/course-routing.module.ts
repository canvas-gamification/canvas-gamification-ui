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
import {CourseCreateComponent} from "@app/course/course-create/course-create.component"
import {CoursePracticePageComponent} from "@app/course/course-practice-page/course-practice-page.component"
import {CoursePracticeComponent} from "@app/course/course-practice/course-practice.component"
import {TokenUseSnippetComponent} from "@app/course/token-use-snippet/token-use-snippet.component"
import {CourseChallengeSnippetComponent} from "@app/course/course-challenge-snippet/course-challenge-snippet.component"
import {CourseHomepageComponent} from "@app/course/course-homepage/course-homepage.component"
import {CourseEventsSnippetComponent} from "@app/course/course-events-snippet/course-events-snippet.component"
import {EventStatsComponent} from "@app/course/event/event-stats/event-stats.component"
import {LeaderBoardComponent} from "@app/course/leader-board/leader-board.component"


const routes: Routes = [
    {
        path: '',
        component: CourseListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'create',
        component: CourseCreateComponent,
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
            },
            {
                path: 'practice',
                component: CoursePracticePageComponent,
            },
            {
                path: 'practice/concept-map',
                component: CoursePracticeComponent,
            },
            {
                path: 'register',
                component: CourseRegisterComponent,
            },
            {
                path: 'event',
                component: CourseEventsSnippetComponent,
            },
            {
                path: 'new-event',
                component: CourseEventCreateEditComponent,
            },
            {
                path: 'new-event/:eventId',
                component: CourseEventCreateEditComponent,
            },
            {
                path: 'event/:eventId',
                component: CourseQuestionSnippetComponent,
            },
            {
                path: 'event/:eventId/stats',
                component: EventStatsComponent,
            },
            {
                path: 'problem/:id',
                component: ProblemViewComponent,
            },
            {
                path: 'event/:eventId/problem/:id',
                component: ProblemViewComponent,
            },
            {
                path: 'practice/category/:categoryId',
                component: PracticeProblemComponent,
            },
            {
                path: 'goal',
                component: GoalPageComponent,
            },
            {
                path: 'goal/create',
                component: GoalCreateComponent,
            },
            {
                path: 'goal/:goalId',
                component: GoalComponent,
            },
            {
                path: 'token',
                component: TokenUseSnippetComponent,
            },
            {
                path: 'challenges',
                component: CourseChallengeSnippetComponent,
            },
            {
                path: 'leaderboard',
                component: LeaderBoardComponent
            }]
    }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule {
}
