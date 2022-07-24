import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {FormGroup} from '@angular/forms'
import {CourseService} from '@app/course/_services/course.service'
import {CourseRegistrationRequest, CourseRegistrationResponse, REGISTRATION_STATUS} from '@app/_models'
import {CourseRegisterForm} from "@app/course/_forms/register.form"
import {
    CourseRegistrationStepperComponent
} from "@app/course/course-registration/course-registration-stepper/course-registration-stepper.component"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"

export const STEPPER_STAGES = {
    ENTER_NAME: 0,
    CONFIRM_IDENTITY: 1,
    VERIFICATION: 2,
    REGISTERED: 3,
}

@Component({
    selector: 'app-register',
    templateUrl: './course-register.component.html',
    styleUrls: ['./course-register.component.scss']
})
export class CourseRegisterComponent implements OnInit {
    @ViewChild('stepper') stepper!: CourseRegistrationStepperComponent

    nameForm: FormGroup
    confirmNameForm: FormGroup
    studentNumberForm: FormGroup
    verifyForm: FormGroup

    courseId: number
    courseName: string
    needsStudentNumber: boolean
    serverGuessedName: string
    attemptsRemaining: number
    loadingContent: boolean
    registered = false
    blocked = false
    courseNotFound = false
    showSkeletons = true

    readonly verificationNumberMask = {
        guide: false,
        mask: [/\d/, /\d/]
    }

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private changeDetector: ChangeDetectorRef,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService
    ) {
        this.courseId = this.route.snapshot.params.courseId
        this.needsStudentNumber = false
        this.loadingContent = false
    }

    ngOnInit(): void {
        this.nameForm = CourseRegisterForm.createNameForm()
        this.confirmNameForm = CourseRegisterForm.createConfirmNameForm()
        this.studentNumberForm = CourseRegisterForm.createStudentNumberForm()
        this.verifyForm = CourseRegisterForm.createVerifyForm()
        this.getRegistrationStatus()
        this.getCourseName()
    }

    /**
     * Retrieves the course name for use in the registration process.
     */
    getCourseName(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.courseName = course.name
            this.showSkeletons = false
        }, () => {
            this.courseNotFound = true
            this.showSkeletons = false
        })
    }

    /**
     * Retrieve the current user's registration status for the current course
     */
    getRegistrationStatus(): void {
        this.courseService.getCourseRegistrationStatus(this.courseId).subscribe(courseRegistrationStatus => {
            this.attemptsRemaining = courseRegistrationStatus?.attempts_remaining
            if (courseRegistrationStatus.status === REGISTRATION_STATUS.BLOCKED) {
                this.blocked = true
            }
            if (courseRegistrationStatus.status === REGISTRATION_STATUS.REGISTERED) {
                this.registered = true
            }
        })
    }

    /**
     * Actions to perform when the nameForm is submitted
     */
    onNameFormSubmit(): void {
        this.resetFormValues()
        const data = this.generateCourseRegistrationRequest()
        if (!data.name) return
        this.needsStudentNumber = false
        this.loadingContent = true
        this.registerAndUpdateStepper(data)
    }

    /**
     * Actions to perform when the confirmationForm/studentNumberForm is submitted
     */
    onConfirmationFormSubmit(): void {
        const data = this.generateCourseRegistrationRequest()
        if (!data.name && !data.student_number) return
        this.loadingContent = true
        this.registerAndUpdateStepper(data)
    }

    /**
     * Actions to perform when the verifyForm is submitted
     */
    onVerificationFormSubmit(): void {
        const data = this.generateCourseRegistrationRequest()
        if (!data.code) return
        this.loadingContent = true
        this.verifyRegistrationAndUpdateStepper(data)
    }

    /**
     * Register data and then update the stepper position
     * @param data
     */
    registerAndUpdateStepper(data: CourseRegistrationRequest): void {
        this.courseService.register(this.courseId, data).subscribe(courseRegResponse => {
            if (courseRegResponse.bad_request) {
                this.sendErrorMessage()
            } else {
                this.setStepperStatusFromRegistration(courseRegResponse)
            }
            this.cleanUpLoadingContent()
        })
    }

    /**
     * Verify the registration data and then update the stepper position
     * @param data
     */
    verifyRegistrationAndUpdateStepper(data: CourseRegistrationRequest): void {
        this.courseService.registerVerify(this.courseId, data).subscribe(courseRegResponse => {
            if (courseRegResponse.bad_request) {
                this.sendErrorMessage()
            } else {
                this.setStepperStatusFromRegistration(courseRegResponse)
            }
            this.cleanUpLoadingContent()
        })
    }

    /**
     * Set the loadingContent variable to false after server actions have been completed
     * Detect changes to update the buttons states to avoid ExpressionChangedAfterItHasBeenCheckedError's
     */
    cleanUpLoadingContent(): void {
        this.loadingContent = false
        this.changeDetector.detectChanges()
    }

    /**
     * Set the stepper stage based on the course registration response object sent from the API
     * @param courseRegResponse - the backend course registration response object
     */
    setStepperStatusFromRegistration(courseRegResponse: CourseRegistrationResponse): void {
        this.serverGuessedName = courseRegResponse?.guessed_name
        if (this.serverGuessedName) this.confirmNameForm.get('confirmNameControl').setValue(courseRegResponse?.guessed_name)
        this.attemptsRemaining = courseRegResponse?.attempts_remaining ?? this.attemptsRemaining

        if (courseRegResponse.success) {
            this.stepper.setNextStep()
        } else {
            if (this.stepper.currentStep === STEPPER_STAGES.ENTER_NAME) {
                this.needsStudentNumber = true
                this.stepper.setNextStep()
            }
        }
    }

    /**
     * Returns the formatted form data ready to send to the API
     */
    generateCourseRegistrationRequest(): CourseRegistrationRequest {
        return {
            name: this.nameForm.value.nameControl || null,
            confirmed_name: this.confirmNameForm.value.confirmNameControl || null,
            student_number: this.studentNumberForm.value.studentNumberControl || null,
            code: this.verifyForm.value.verifyControl || null,
        }
    }

    /**
     * Sends out a notification error message
     */
    sendErrorMessage(): void {
        this.notificationsService
            .show('Check that your inputted values are accurate and try again.', {
                status: TuiNotification.Error
            }).subscribe()
    }

    /**
     * Reset the form values except for the first step
     */
    resetFormValues(): void {
        this.serverGuessedName = null
        this.confirmNameForm.reset()
        this.studentNumberForm.reset()
        this.verifyForm.reset()
    }
}
