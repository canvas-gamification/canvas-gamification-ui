import { TuiCardLarge } from "@taiga-ui/layout";
import { TuiChip } from "@taiga-ui/kit";
import { TuiButton } from "@taiga-ui/core";
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
        TuiCardLarge,
        TuiChip,
    ]
})
export class CourseIslandModule {
}
