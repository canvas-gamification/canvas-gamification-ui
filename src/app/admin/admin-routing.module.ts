import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {AuthGuard} from "@app/_helpers/auth.guard"
import {AdminComponent} from "@app/admin/admin.component"
import {
    ExportPageViewComponentComponent
} from "@app/admin/export/export-page-view-component/export-page-view-component.component"
import {ExportActionComponent} from "@app/admin/export/export-action/export-action.component"
import {ExportConsentComponent} from "@app/admin/export/export-consent/export-consent.component"
import {ExportUserComponent} from "@app/admin/export/export-user/export-user.component"
import {ExportSurveyComponent} from "@app/admin/export/export-survey/export-survey.component"

const routes = [
    {
        path: 'export/page-view',
        component: ExportPageViewComponentComponent,
    },
    {
        path: 'export/action',
        component: ExportActionComponent,
    },
    {
        path: 'export/consent',
        component: ExportConsentComponent,
    },
    {
        path: 'export/user',
        component: ExportUserComponent,
    },
    {
        path: 'export/survey',
        component: ExportSurveyComponent,
    },
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
