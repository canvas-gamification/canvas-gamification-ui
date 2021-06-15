import {AuthGuard} from "@app/_helpers/auth.guard";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CourseListComponent} from "@app/course/course-list/course-list.component";
import {CourseRegisterComponent} from "@app/course/course-registration/course-register.component";
import {CourseComponent} from "@app/course/course.component";
import {CourseEventCreateEditComponent} from "@app/course/course-event-create/course-event-create-edit.component";
import {CourseQuestionSnippetComponent} from "@app/course/course-question-snippet/course-question-snippet.component";
import {ProblemViewComponent} from "@app/problems/problem-view/problem-view.component";

const routes = [
    {
        path: '',
        component: CourseListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register/:courseId',
        component: CourseRegisterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'view/:courseId',
        component: CourseComponent,
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
        path: ':courseId',
        children: [
            {path: 'problem/:id', component: ProblemViewComponent},
            {path: 'event/:eventId/problem/:id', component: ProblemViewComponent}
        ],
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule {
}
