import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {FormGroup} from '@angular/forms'
import {CourseService} from '@app/course/_services/course.service'
import {CourseRegisterForm} from "@app/course/_forms/register.form"
import {CourseRegistrationStepperComponent} from "@app/course/course-registration/course-registration-stepper/course-registration-stepper.component"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {CourseRegistrationMode} from "@app/_models"

@Component({
    selector: 'app-register',
    templateUrl: './course-register.component.html',
    styleUrls: ['./course-register.component.scss']
})
export class CourseRegisterComponent implements OnInit {
    @ViewChild('stepper') stepper!: CourseRegistrationStepperComponent

    form: FormGroup

    courseId: number
    courseName: string
    loadingContent: boolean
    registered = false
    blocked = false
    courseNotFound = false
    showSkeletons = true

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private courseService: CourseService,
        private changeDetector: ChangeDetectorRef,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService
    ) {
        this.courseId = this.route.snapshot.parent.params.courseId
        this.loadingContent = false
    }

    ngOnInit(): void {
        this.form = CourseRegisterForm.createForm()
        this.getCourseName()
    }

    /**
     * Retrieves the course name for use in the registration process.
     */
    getCourseName(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.courseName = course.name
            this.showSkeletons = false
            this.registered = course.course_reg.is_verified
            this.blocked = course.course_reg.is_blocked
            if (course.registration_mode === CourseRegistrationMode.OPEN)
                this.onSubmit()
        }, () => {
            this.courseNotFound = true
            this.showSkeletons = false
        })
    }

    /**
     * Actions to perform when the form is submitted
     */
    onSubmit(): void {
        const data = CourseRegisterForm.extractData(this.form)
        this.loadingContent = true
        this.courseService.register(this.courseId, data).subscribe(() => {
            this.notificationsService
                .show(`Successfully registered in ${this.courseName}`, {
                    status: TuiNotification.Success
                }).subscribe()
            this.router.navigate(['/course', this.courseId]).then()
            this.loadingContent = false
        }, () => this.loadingContent = false)
    }
}
