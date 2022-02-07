import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AsFormGroupPipe} from "@app/_helpers/pipes/as-form-group.pipe";
import {AsFormControlPipe} from './as-form-control.pipe';
import {StringifyTuiDataListPipe} from './stringify-tui-data-list.pipe';
import {GetColorFromStringPipe} from './get-color-from-string.pipe';
import {UserHasCourseViewPermissionsPipe} from './user-has-course-view-permissions.pipe';
import {TuiStatusPipe} from './tui-status.pipe';


@NgModule({
    declarations: [
        AsFormGroupPipe,
        AsFormControlPipe,
        StringifyTuiDataListPipe,
        GetColorFromStringPipe,
        UserHasCourseViewPermissionsPipe,
        TuiStatusPipe,
    ],
    exports: [
        AsFormGroupPipe,
        AsFormControlPipe,
        StringifyTuiDataListPipe,
        UserHasCourseViewPermissionsPipe,
        GetColorFromStringPipe,
        TuiStatusPipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule {
}
