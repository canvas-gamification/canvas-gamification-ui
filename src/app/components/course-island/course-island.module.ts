import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CourseIslandComponent} from './course-island.component'
import {TuiIslandModule, TuiTagModule} from "@taiga-ui/kit"
import {RouterModule} from "@angular/router"
import {TuiButtonModule} from "@taiga-ui/core"
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
        TuiButtonModule,
        TuiIslandModule,
        TuiTagModule,
    ]
})
export class CourseIslandModule {
}
