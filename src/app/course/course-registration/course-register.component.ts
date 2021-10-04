import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {CourseService} from '@app/course/_services/course.service';
import {ToastrService} from "ngx-toastr";
import {CourseRegistrationRequest, CourseRegistrationResponse, REGISTRATION_STATUS} from '@app/_models';
import {CourseRegisterForm} from "@app/course/_forms/register.form";
import {CourseRegistrationStepperComponent} from "@app/course/course-registration/course-registration-stepper/course-registration-stepper.component";

export const STEPPER_STAGES = {
    ENTER_NAME: 0,
    CONFIRM_IDENTITY: 1,
    VERIFICATION: 2,
    REGISTERED: 3,
};

@Component({
    selector: 'app-register',
    templateUrl: './course-register.component.html',
    styleUrls: ['./course-register.component.scss']
})
export class CourseRegisterComponent implements OnInit {
    @ViewChild('stepper')
    stepper!: CourseRegistrationStepperComponent;

    nameForm: FormGroup;
    confirmNameForm: FormGroup;
    studentNumberForm: FormGroup;
    verifyForm: FormGroup;

    courseId: number;
    needsStudentNumber: boolean;
    serverGuessedName: string;
    attemptsRemaining: number;
    loadingContent: boolean;
    registered: boolean;

    readonly verificationNumberMask = {
        guide: true,
        mask: [/\d/, /\d/]
    };

    constructor(private route: ActivatedRoute,
                private courseService: CourseService,
                private toastr: ToastrService) {
        this.courseId = this.route.snapshot.params.courseId;
        this.needsStudentNumber = false;
        this.loadingContent = false;
    }

    ngOnInit(): void {
        this.nameForm = CourseRegisterForm.createNameForm();
        this.confirmNameForm = CourseRegisterForm.createConfirmNameForm();
        this.studentNumberForm = CourseRegisterForm.createStudentNumberForm();
        this.verifyForm = CourseRegisterForm.createVerifyForm();
        this.getRegistrationStatus();
    }

    /**
     * Retrieve the current user's registration status for the current course
     */
    getRegistrationStatus(): void {
        this.courseService.getCourseRegistrationStatus(this.courseId).subscribe(
            courseRegistrationStatus => {
                // the api only responds with a non-null message value if the user is blocked from registering, thus the "danger" type
                if (courseRegistrationStatus.message) {
                    this.toastr.error(courseRegistrationStatus.message);
                }
                if (courseRegistrationStatus.status === REGISTRATION_STATUS.REGISTERED) {
                    this.toastr.success('You have already successfully registered in this course!');
                    this.registered = true;
                } else {
                    this.registered = false;
                }
            }
        );
    }

    /**
     * Actions to perform when the nameForm is submitted
     */
    onNameFormSubmit(): void {
        this.resetFormValues();
        const data = this.generateCourseRegistrationRequest();
        this.needsStudentNumber = false;
        this.loadingContent = true;
        if (!data.name) return;
        this.registerAndUpdateStepper(data);
    }

    /**
     * Actions to perform when the confirmationForm/studentNumberForm is submitted
     */
    onConfirmationFormSubmit(): void {
        const data = this.generateCourseRegistrationRequest();
        this.loadingContent = true;
        if (!data.name && !data.student_number) return;
        this.registerAndUpdateStepper(data);
    }

    /**
     * Actions to perform when the verifyForm is submitted
     */
    onVerificationFormSubmit(): void {
        const data = this.generateCourseRegistrationRequest();
        this.loadingContent = true;
        if (!data.code) return;
        this.verifyRegistrationAndUpdateStepper(data);
    }

    /**
     * Register data and then update the stepper position
     * @param data
     */
    registerAndUpdateStepper(data: CourseRegistrationRequest): void {
        this.courseService.register(this.courseId, data).subscribe(
            courseRegResponse => {
                if (courseRegResponse.bad_request) {
                    this.sendErrorMessage();
                } else {
                    this.setStepperStatusFromRegistration(courseRegResponse);
                }
                this.loadingContent = false;
            }
        );
    }

    /**
     * Verify the registration data and then update the stepper position
     * @param data
     */
    verifyRegistrationAndUpdateStepper(data: CourseRegistrationRequest): void {
        this.courseService.registerVerify(this.courseId, data).subscribe(
            courseRegResponse => {
                if (courseRegResponse.bad_request) {
                    this.sendErrorMessage();
                } else {
                    this.setStepperStatusFromRegistration(courseRegResponse);
                }
                this.loadingContent = false;
            }
        );
    }

    /**
     * Set the stepper stage based on the course registration response object sent from the API
     * @param courseRegResponse - the backend course registration response object
     */
    setStepperStatusFromRegistration(courseRegResponse: CourseRegistrationResponse): void {
        this.serverGuessedName = courseRegResponse?.guessed_name;
        if (this.serverGuessedName) this.confirmNameForm.get('confirmNameControl').setValue(courseRegResponse?.guessed_name);
        this.attemptsRemaining = courseRegResponse?.attempts_remaining;

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
            code: this.verifyForm.value.verifyControl || null,
        };
    }

    /**
     * Sends out a toastr error message
     */
    sendErrorMessage(): void {
        this.toastr.error('Something went wrong. Check that your inputted values are accurate and try again.');
    }

    /**
     * Reset the form values except for the first step
     */
    resetFormValues(): void {
        this.serverGuessedName = null;
        this.confirmNameForm.reset();
        this.studentNumberForm.reset();
        this.verifyForm.reset();
    }
}
