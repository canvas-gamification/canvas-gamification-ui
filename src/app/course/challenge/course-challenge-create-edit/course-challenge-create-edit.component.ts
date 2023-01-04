import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {CourseEvent} from "@app/_models"
import {CourseService} from "@app/course/_services/course.service"

@Component({
    selector: 'app-course-challenge-create-edit',
    templateUrl: './course-challenge-create-edit.component.html',
    styleUrls: ['./course-challenge-create-edit.component.scss']
})
export class CourseChallengeCreateEditComponent implements OnInit {
    courseId: number
    eventId: number = null
    events: CourseEvent[]
    challenge: CourseEvent
    search: string

    topXTeams = true
    consistency = false
    list = [{id: 1, name: 'name A'}, {id: 2, name: 'name B'}, {id: 3, name: 'name C'}]

    constructor(
        private route: ActivatedRoute,
        private courseEventService: CourseEventService,
        private courseService: CourseService,
    ) { }

    ngOnInit(): void {
        this.courseId = +this.route.snapshot.parent.paramMap.get('courseId')
        this.courseService.getCourseEvents(this.courseId).subscribe( events => this.events = events)

        if (this.route.snapshot.paramMap.get('eventId')){ // For editing existing challenge, grab the eventId
            this.eventId = +this.route.snapshot.paramMap.get('eventId')
            this.courseEventService.getCourseEvent(this.eventId).subscribe( event => this.challenge = event)
        }
    }


    stringify(event: CourseEvent): string {
        return event.name
    }

    getCourseEvents() {
        if (!this.search)
            return this.events.filter( event => event.type === 'CHALLENGE')
        return this.events.filter( event => event.type === 'CHALLENGE').filter(event => event.name.includes(this.search))
    }

    onSearchChange(searchQuery: string | null): void {
        this.search = searchQuery
    }
}
