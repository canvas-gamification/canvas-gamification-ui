import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AsFormGroupPipe} from "@app/_helpers/pipes/as-form-group.pipe";
import {AsFormControlPipe} from './as-form-control.pipe';
import { StringifyTuiDataListPipe } from './stringify-tui-data-list.pipe';


@NgModule({
    declarations: [
        AsFormGroupPipe,
        AsFormControlPipe,
        StringifyTuiDataListPipe
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
