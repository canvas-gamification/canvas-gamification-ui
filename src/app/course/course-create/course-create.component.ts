import {Component, Inject} from '@angular/core'
import {FormGroup} from "@angular/forms"
import {CourseForm} from "@app/course/_forms/course.form"
import {CourseService} from '../_services/course.service'
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {Router} from '@angular/router'
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
export class CourseCreateComponent {

    registrationModes = [
        "Open",
        "Private",
    ]

    formGroup: FormGroup

    constructor(
        private readonly courseService: CourseService,
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService,
        private readonly router: Router,
    ) {
        this.formGroup = CourseForm.createCourseForm()
    }

    showAccessCode() {
        const registrationMode = this.formGroup.get('registrationMode').value
        return registrationMode === 'Private'
    }

    onSubmit() {
        this.courseService.createCourse(
            CourseForm.formatCourseFormData(this.formGroup)
        ).subscribe(course => {
            this.notificationsService.show('Course created successfully!', {
                status: TuiNotification.Success,
            }).subscribe()
            this.router.navigate(['/course', course.id])
        })
    }
}
