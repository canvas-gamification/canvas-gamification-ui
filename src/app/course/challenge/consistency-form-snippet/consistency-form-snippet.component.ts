import {Component, Input, OnInit} from '@angular/core'
import {FormGroup} from "@angular/forms"
import {CourseEvent} from "@app/_models"
import {ActivatedRoute} from "@angular/router"
import {CourseService} from "@app/course/_services/course.service"
import {ChallengeType} from "@app/_models/challengeType"
import {EventSetForm} from "@app/course/_forms/event-set.form"

@Component({
    selector: 'app-consistency-form-snippet',
    templateUrl: './consistency-form-snippet.component.html',
    styleUrls: ['./consistency-form-snippet.component.scss']
})
export class ConsistencyFormSnippetComponent implements OnInit {
    @Input() localChallengeType: ChallengeType
    courseId: number
    events: CourseEvent[] // All the events in this course
    consistencyChallengeForm: FormGroup
    search: string

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
    ) {
    }

    ngOnInit(): void {
        this.courseId = +this.route.snapshot.parent.paramMap.get('courseId')

        this.courseService.getCourse(this.courseId).subscribe(course =>
            this.events = course.events)

        this.consistencyChallengeForm = EventSetForm.createEventSetForm()

        // if (this.route.snapshot.paramMap.get('eventId')) {
        //     // this.eventId = +this.route.snapshot.paramMap.get('eventId')
        //     // this.courseEventService.getCourseEvent(this.eventId).subscribe(event => {
        //     //     this.event = event
        //     //     this.challengeForm = ChallengeForm.createChallengeFormWithData(this.event)
        //     // })
        // }
    }

    stringify(eventInCourse: CourseEvent): string {
        return eventInCourse.name
    }

    onSearchChange(searchQuery: string | null): void {
        this.search = searchQuery
    }

    getCourseEvents(): CourseEvent[] {
        if(!this.search)
            return this.events
        return this.events.filter(event => event.name.includes(this.search) )
    }

}
