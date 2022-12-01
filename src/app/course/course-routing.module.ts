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
import {ListOfTeamsComponent} from "@app/course/list-of-teams/list-of-teams.component"

const routes: Routes = [
    {
        path: '',
        component: CourseListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':courseId',
        component: CourseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':courseId/register',
        component: CourseRegisterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':courseId/new-event',
        component: CourseEventCreateEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':courseId/new-event/:eventId',
        component: CourseEventCreateEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':courseId/event/:eventId',
        component: CourseQuestionSnippetComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':courseId/problem/:id',
        component: ProblemViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':courseId/event/:eventId/problem/:id',
        component: ProblemViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':courseId/practice/category/:categoryId',
        component: PracticeProblemComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':courseId/goal',
        component: GoalPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: ':courseId/goal/create',
        component: GoalCreateComponent,
        canActivate: [AuthGuard],
    },
    {
        path: ':courseId/goal/:goalId',
        component: GoalComponent,
        canActivate: [AuthGuard],
    },
    {
        path: ':courseId/event/:eventId/teams',
        component: ListOfTeamsComponent,
        canActivate: [AuthGuard]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule {
}
