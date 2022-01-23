import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AsFormGroupPipe} from "@app/_helpers/pipes/as-form-group.pipe";
import {AsFormControlPipe} from './as-form-control.pipe';
import { StringifyTuiDataListPipe } from './stringify-tui-data-list.pipe';
import { GetColorFromStringPipe } from './get-color-from-string.pipe';
import { UserHasCourseViewPermissionsPipe } from './user-has-course-view-permissions.pipe';


@NgModule({
    declarations: [
        AsFormGroupPipe,
        AsFormControlPipe,
        StringifyTuiDataListPipe,
        GetColorFromStringPipe,
        UserHasCourseViewPermissionsPipe,
    ],
    exports: [
        AsFormGroupPipe,
        AsFormControlPipe,
        StringifyTuiDataListPipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule {
}
