import {Component, Inject, OnInit} from '@angular/core'
import {FormGroup} from "@angular/forms"
import {CourseForm} from "@app/course/_forms/course.form"
import {CourseService} from '../_services/course.service'
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {ActivatedRoute, Router} from '@angular/router'
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit"

@Component({
    selector: 'app-course-create',
    templateUrl: './course-create.component.html',
    styleUrls: ['./course-create.component.scss'],
    providers: [
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                pattern: `Please enter a valid url starting with http:// or https://`,
            },
        },
    ],
})
export class CourseCreateComponent implements OnInit {

    // TODO: Put in breadcrumbs
    // TODO: Fix dates
    // TODO: Put edit button for instructor
    // TODO: Fix wording on edit page

    registrationModes = [
        "Open",
        "Private",
    ]

    formGroup: FormGroup
    courseId: number

    constructor(
        private route: ActivatedRoute,
        private readonly courseService: CourseService,
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService,
        private readonly router: Router,
    ) {
    }

    ngOnInit(): void {
        if (this.route.snapshot.params.courseId) {
            this.courseId = this.route.snapshot.params.courseId
            this.courseService.getCourse(this.courseId).subscribe(course => {
                this.formGroup = CourseForm.createCourseFormWithData(course)
            })
        } else {
            this.formGroup = CourseForm.createCourseForm()
        }
    }

    showAccessCode() {
        const registrationMode = this.formGroup.get('registrationMode').value
        return registrationMode === 'Private'
    }

    onSubmit() {
        if (!this.courseId) {
            this.courseService.createCourse(
                CourseForm.formatCourseFormData(this.formGroup)
            ).subscribe(course => {
                this.notificationsService.show('Course created successfully!', {
                    status: TuiNotification.Success,
                }).subscribe()
                this.router.navigate(['/course', course.id]).then()
            })
        } else {
            this.courseService.editCourse(
                this.courseId,
                CourseForm.formatCourseFormData(this.formGroup)
            ).subscribe(() => {
                this.notificationsService.show('Course edited successfully!', {
                    status: TuiNotification.Success,
                }).subscribe()
            })
        }
    }
}
