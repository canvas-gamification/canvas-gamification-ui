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
        path: ':courseId',
        component: CourseComponent,
        children: [
            {path: 'problem/:id', component: ProblemViewComponent},
            {path: 'register', component: CourseRegisterComponent},
            {
                path: 'new-event', component: CourseEventCreateEditComponent,
                children: [
                    {path: ':eventId', component: CourseEventCreateEditComponent}
                ]
            },
            {
                path: 'event/:eventId',
                component: CourseQuestionSnippetComponent,
                children: [
                    {path: 'problem/:id', component: ProblemViewComponent}
                ]
            }
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
