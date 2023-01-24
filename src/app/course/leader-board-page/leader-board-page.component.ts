import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router"
import {CourseService} from "@app/course/_services/course.service"
import {Course, CourseEvent} from "@app/_models"

@Component({
    selector: 'app-leader-board-page',
    templateUrl: './leader-board-page.component.html',
    styleUrls: ['./leader-board-page.component.scss']
})
export class LeaderBoardPageComponent implements OnInit {
    courseId: number
    course: Course
    events: CourseEvent[]
    options = ['a', 'b', 'c']

    constructor(
        // private courseEventService: CourseEventService,
        private courseService: CourseService,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
        this.courseId = this.route.snapshot.params.courseId
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
            this.events = course.events.filter(event => event.type === 'CHALLENGE')
        })
    }


}
