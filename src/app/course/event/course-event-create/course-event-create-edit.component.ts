import {Component, Inject, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {EventType} from '@app/_models'
import {CourseEventService} from '@app/course/_services/course-event.service'
import {AbstractControl, FormGroup} from '@angular/forms'
import {CourseEventForm} from "@app/course/_forms/course-event.form"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {tuiCreateTimePeriods} from "@taiga-ui/kit"

@Component({
    selector: 'app-course-event-create',
    templateUrl: './course-event-create-edit.component.html',
    styleUrls: ['./course-event-create-edit.component.scss']
})
export class CourseEventCreateEditComponent implements OnInit {
    localEventTypes: EventType[] = [['ASSIGNMENT', 'Assignment'], ["EXAM", "Exam"]]
    courseId: number
    eventId: number = null
    formData: FormGroup
    timeOptions = tuiCreateTimePeriods()

    constructor(
        private route: ActivatedRoute,
        private courseEventService: CourseEventService,
        private router: Router,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService
    ) {
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formData.controls
    }

    ngOnInit(): void {
        this.formData = CourseEventForm.createForm()
        // Convert to number
        this.courseId = +this.route.snapshot.parent.paramMap.get('courseId')
        if (this.route.snapshot.paramMap.get('eventId')) {
            this.eventId = +this.route.snapshot.paramMap.get('eventId')
            this.courseEventService.getCourseEvent(this.eventId).subscribe(event => {
                this.formData = CourseEventForm.createFormWithData(event)
            })
        }
    }

    /**
     * Sends the course event data to the server. Sends different requests based on whether the event being created
     * is a new event or not.
     * @param formData - grabs the components formData and creates a request based on that
     */
    submitEvent(formData: FormGroup): void {
        const ourEvent = CourseEventForm.formatFormData(formData, this.courseId, this.eventId)
        if (this.eventId) { // If this is a previously existing event
            this.courseEventService.updateCourseEvent(ourEvent).subscribe(() => {
                this.notificationsService
                    .show('The Event has been updated Successfully.', {
                        status: TuiNotification.Success
                    }).subscribe()
                this.router.navigate(['course', this.courseId, 'assignments-exams']).then()
            }, error => {
                this.notificationsService
                    .show(error, {
                        status: TuiNotification.Error
                    }).subscribe()
            })
        } else { // Creating a brand new event
            this.courseEventService.addCourseEvent(ourEvent).subscribe(() => {
                this.notificationsService
                    .show('The Event has been added Successfully.', {
                        status: TuiNotification.Success
                    })
                this.router.navigate(['course', this.courseId, 'assignments-exams']).then()
            }, error => {
                this.notificationsService
                    .show(error, {
                        status: TuiNotification.Error
                    }).subscribe()
            })
        }
    }
}
