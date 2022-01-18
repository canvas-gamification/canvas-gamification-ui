import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { GetColorFromStringPipe } from './get-color-from-string.pipe';
import { UserHasCourseViewPermissionsPipe } from './user-has-course-view-permissions.pipe';


@NgModule({
    declarations: [GetColorFromStringPipe, UserHasCourseViewPermissionsPipe],
    exports: [
        GetColorFromStringPipe,
        UserHasCourseViewPermissionsPipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule {
}
