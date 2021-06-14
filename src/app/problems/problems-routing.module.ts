import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProblemSetComponent} from "@app/problems/problems/problem-set/problem-set.component";
import {AuthGuard} from "@app/_helpers/auth.guard";
import {ProblemViewComponent} from "@app/problems/problems/problem-view/problem-view.component";
import {ProblemEditComponent} from "@app/problems/problems/problem-edit/problem-edit.component";
import {ProblemCreateComponent} from "@app/problems/problems/problem-create/problem-create.component";
import {SubmissionViewComponent} from "@app/problems/problems/submission-view/submission-view.component";

const routes: Routes = [
    {path: '', component: ProblemSetComponent, canActivate: [AuthGuard]},
    {path: ':id', component: ProblemViewComponent, canActivate: [AuthGuard]},
    {path: ':id/edit', component: ProblemEditComponent, canActivate: [AuthGuard]},
    {path: 'create/:type', component: ProblemCreateComponent, canActivate: [AuthGuard]},
    {path: 'submission/:id', component: SubmissionViewComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProblemsRoutingModule {
}
