import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProblemSetComponent} from "@app/problems/problem-set/problem-set.component";
import {AuthGuard} from "@app/_helpers/auth.guard";
import {ProblemViewComponent} from "@app/problems/problem-view/problem-view.component";
import {ProblemCreateEditComponent} from "@app/problems/problem-create-edit/problem-create-edit.component";

const routes: Routes = [
    {path: '', component: ProblemSetComponent, canActivate: [AuthGuard]},
    {path: ':id', component: ProblemViewComponent, canActivate: [AuthGuard]},
    {path: ':id/edit', component: ProblemCreateEditComponent, canActivate: [AuthGuard]},
    {path: 'create/:type', component: ProblemCreateEditComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProblemsRoutingModule {
}
