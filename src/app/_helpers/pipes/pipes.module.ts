import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AsFormGroupPipe} from "@app/_helpers/pipes/as-form-group.pipe"
import {AsFormControlPipe} from './as-form-control.pipe'
import {StringifyTuiDataListPipe} from './stringify-tui-data-list.pipe'
import {GetColorFromStringPipe} from './get-color-from-string.pipe'
import {UserHasCourseViewPermissionsPipe} from './user-has-course-view-permissions.pipe'
import {TuiStatusPipe} from './tui-status.pipe'
import {GetKatexHtmlStringPipe} from './get-katex-html-string.pipe'
import {GetKatexStringPipe} from './get-katex-string.pipe'


@NgModule({
    declarations: [
        AsFormControlPipe,
        AsFormGroupPipe,
        GetColorFromStringPipe,
        GetKatexHtmlStringPipe,
        GetKatexStringPipe,
        StringifyTuiDataListPipe,
        TuiStatusPipe,
        UserHasCourseViewPermissionsPipe,
    ],
    exports: [
        AsFormControlPipe,
        AsFormGroupPipe,
        GetColorFromStringPipe,
        GetKatexHtmlStringPipe,
        StringifyTuiDataListPipe,
        TuiStatusPipe,
        UserHasCourseViewPermissionsPipe,
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule {
}
