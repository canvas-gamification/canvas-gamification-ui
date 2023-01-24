import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router"
import {CourseService} from "@app/course/_services/course.service"
import {Course} from "@app/_models"

@Component({
    selector: 'app-leader-board-page',
    templateUrl: './leader-board-page.component.html',
    styleUrls: ['./leader-board-page.component.scss']
})
export class LeaderBoardPageComponent implements OnInit {
    courseId: number
    course: Course
    events: Event
    options = ['a', 'b', 'c']

    constructor(
        // private courseEventService: CourseEventService,
        private courseService: CourseService,
        private route: ActivatedRoute
    ) {
        this.courseId = this.route.snapshot.parent.params.courseId
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => this.course = course)

    }


}
