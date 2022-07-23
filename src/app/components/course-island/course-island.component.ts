import {Component, Input} from '@angular/core'
import {Course, STATUS} from "@app/_models"

@Component({
    selector: 'app-course-island',
    templateUrl: './course-island.component.html',
    styleUrls: ['./course-island.component.scss']
})
export class CourseIslandComponent {
    @Input() course: Course
    @Input() hasViewPermission: boolean
    @Input() skeleton = false
    readonly STATUS = STATUS
}
