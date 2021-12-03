import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {CourseService} from '@app/course/_services/course.service';
import {CourseRegistrationRequest, CourseRegistrationResponse} from '@app/_models';
import {CourseRegisterForm} from "@app/course/_forms/register.form";
import {CourseRegistrationStepperComponent} from "@app/course/course-registration/course-registration-stepper/course-registration-stepper.component";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";

export const STEPPER_STAGES = {
    ENTER_NAME: 0,
    STUDENT_NUMBER: 1,
    STUDENT_ID: 2,
    REGISTERED: 3,
};

@Component({
    selector: 'app-dashboard-register',
    templateUrl: './course-dashboard-register.component.html',
    styleUrls: ['./course-dashboard-register.component.scss']
})
export class CourseDashboardRegisterComponent implements OnInit {
    @ViewChild('stepper')
    stepper!: CourseRegistrationStepperComponent;

    nameForm: FormGroup;
    studentNumberForm: FormGroup;
    studentUsernameForm: FormGroup;
    confirmNameForm: FormGroup;

    courseId: number;
    needsStudentNumber: boolean;
    serverGuessedName: string;
    loadingContent: boolean;
    registered: boolean;

    readonly verificationNumberMask = {
        guide: true,
        mask: [/\d/, /\d/]
    };

    constructor(private route: ActivatedRoute,
                private courseService: CourseService,
                private changeDetector: ChangeDetectorRef,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
        this.courseId = this.route.snapshot.params.courseId;
        this.needsStudentNumber = false;
        this.loadingContent = false;
    }

    ngOnInit(): void {
        this.nameForm = CourseRegisterForm.createNameForm();
        this.studentNumberForm = CourseRegisterForm.createStudentNumberForm();
        this.confirmNameForm = CourseRegisterForm.createConfirmNameForm();
        this.studentUsernameForm = CourseRegisterForm.createStudentUsernameForm();
    }

    /**
     * Actions to perform when the nameForm is submitted
     */
    onNameFormSubmit(): void {
        const data = this.generateCourseRegistrationRequest();
        if (!data.name) return;
        this.needsStudentNumber = false;
        this.loadingContent = true;
        this.registerAndUpdateStepper(data);
    }

    /**
     * Actions to perform when the confirmationForm/studentNumberForm is submitted
     */
    onConfirmationFormSubmit(): void {
        const data = this.generateCourseRegistrationRequest();
        if (!data.name && !data.student_number) return;
        this.loadingContent = true;
        this.registerAndUpdateStepper(data);

    }

    /**
     * Actions to perform when the usernameForm is submitted
     */

    onUsernameFormSubmit(): void {
        this.resetFormValues();
        const data = this.generateCourseRegistrationRequest();
        console.log(data);
        this.loadingContent = true;
        this.stepper.setNextStep();
        this.cleanUpLoadingContent();
    }
    /**
     * Register data and then update the stepper position
     * @param data
     */
    registerAndUpdateStepper(data: CourseRegistrationRequest): void {
        this.courseService.registerDashboard(this.courseId, data).subscribe(
            courseRegResponse => {
                if (courseRegResponse.bad_request) {
                    this.sendErrorMessage();
                } else {
                    this.setStepperStatusFromRegistration(courseRegResponse);
                }
                this.cleanUpLoadingContent();
            }
        );
    }

    /**
     * Set the loadingContent variable to false after server actions have been completed
     * Detect changes to update the buttons states to avoid ExpressionChangedAfterItHasBeenCheckedError's
     */
    cleanUpLoadingContent(): void {
        this.loadingContent = false;
        this.changeDetector.detectChanges();
    }

    /**
     * Set the stepper stage based on the course registration response object sent from the API
     * @param courseRegResponse - the backend course registration response object
     */
    setStepperStatusFromRegistration(courseRegResponse: CourseRegistrationResponse): void {
        this.serverGuessedName = courseRegResponse?.guessed_name;
        if (this.serverGuessedName) this.confirmNameForm.get('confirmNameControl').setValue(courseRegResponse?.guessed_name);
        if (courseRegResponse.success) {
            this.stepper.setNextStep();
        } else {
            if (this.stepper.currentStep === STEPPER_STAGES.ENTER_NAME) {
                this.needsStudentNumber = true;
                this.stepper.setNextStep();
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
            student_username: this.studentUsernameForm.value.studentUsernameControl || null
        };
    }

    /**
     * Sends out a notification error message
     */
    sendErrorMessage(): void {
        this.notificationsService
            .show('Something went wrong. Check that your inputted values are accurate and try again.', {
                status: TuiNotification.Error
            }).subscribe();
    }

    /**
     * Reset the form values except for the first step
     */
    resetFormValues(): void {
        this.serverGuessedName = null;
        this.confirmNameForm.reset();
        this.studentNumberForm.reset();
    }
}
