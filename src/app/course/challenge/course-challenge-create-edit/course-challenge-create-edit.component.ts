import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {CourseEvent} from "@app/_models"

@Component({
    selector: 'app-course-challenge-create-edit',
    templateUrl: './course-challenge-create-edit.component.html',
    styleUrls: ['./course-challenge-create-edit.component.scss']
})
export class CourseChallengeCreateEditComponent implements OnInit {
    courseId: number
    eventId: number = null
    challenge: CourseEvent

    constructor(
        private route: ActivatedRoute,
        private courseEventService: CourseEventService,
    ) { }

    ngOnInit(): void {
        this.courseId = +this.route.snapshot.parent.paramMap.get('courseId')
        if (this.route.snapshot.paramMap.get('eventId')){
            this.eventId = +this.route.snapshot.paramMap.get('eventId')
            this.courseEventService.getCourseEvent(this.eventId).subscribe( event => this.challenge = event)
        }

    }

}
