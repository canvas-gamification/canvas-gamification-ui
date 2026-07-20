import { TuiButton } from "@taiga-ui/core";
import { TuiIslandDirective, TuiTagModule } from "@taiga-ui/legacy";
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CourseIslandComponent} from './course-island.component'
import {RouterModule} from "@angular/router"
import {PipesModule} from "@app/_helpers/pipes/pipes.module"


@NgModule({
    declarations: [CourseIslandComponent],
    exports: [
        CourseIslandComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        RouterModule,
        TuiButton,
        TuiIslandDirective,
        TuiTagModule,
    ]
})
export class CourseIslandModule {
}
