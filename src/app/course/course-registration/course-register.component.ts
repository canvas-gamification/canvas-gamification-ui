import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {CourseService} from '@app/course/_services/course.service';
import {ToastrService} from "ngx-toastr";
import {CourseRegistrationRequest, CourseRegistrationResponse, REGISTRATION_STATUS} from '@app/_models';
import {CourseRegisterForm} from "@app/course/_forms/register.form";

export const STEPPER_STAGES = {
    ENTER_NAME: 0,
    CONFIRM_IDENTITY: 1,
    VERIFICATION: 2,
    REGISTERED: 3,
};

@Component({
    selector: 'app-register',
    templateUrl: './course-register.component.html',
    styleUrls: ['./course-register.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false, showError: true}
    }]
})
export class CourseRegisterComponent implements OnInit {
    @ViewChild('stepper') stepper;

    nameForm: FormGroup;
    confirmNameForm: FormGroup;
    studentNumberForm: FormGroup;
    verifyForm: FormGroup;

    courseId: number;
    needsStudentNumber: boolean;
    selectedIndex: number;
    serverGuessedName: string;
    attemptsRemaining: number;

    completed: boolean;
    verification: boolean;
    editable: boolean;

    constructor(private route: ActivatedRoute,
                private courseService: CourseService,
                private toastr: ToastrService) {
        this.courseId = this.route.snapshot.params.courseId;
        this.needsStudentNumber = false;
        this.verification = false;
        this.completed = false;
        this.editable = false;
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
                this.initialStage(courseRegistrationStatus.status);
            }
        );
    }

    /**
     * Set the initial stage of the stepper depending on the registration status of the user
     * @param status - the registration status retreived from the API
     */
    initialStage(status: string): void {
        this.completed = status === REGISTRATION_STATUS.REGISTERED;
        this.verification = status === REGISTRATION_STATUS.AWAIT_VERIFICATION;

        this.selectedIndex = status === REGISTRATION_STATUS.REGISTERED ? STEPPER_STAGES.REGISTERED :
            status === REGISTRATION_STATUS.AWAIT_VERIFICATION ? STEPPER_STAGES.VERIFICATION :
                STEPPER_STAGES.ENTER_NAME;
    }

    /**
     * Set the stepper stage based on the course registration response object sent from the API
     * @param courseRegResponse - the backend course registration response object
     */
    setRegistrationStage(courseRegResponse: CourseRegistrationResponse): void {
        this.serverGuessedName = courseRegResponse?.guessed_name;
        this.attemptsRemaining = courseRegResponse?.attempts_remaining;

        if (courseRegResponse.success) {
            this.nextStep();
        } else {
            if (this.stepper.selectedIndex === STEPPER_STAGES.ENTER_NAME) {
                this.needsStudentNumber = true;
                this.nextStep();
            }
        }
    }

    /**
     * Method to submit the registration step
     */
    registerStepSubmit(): void {
        const data = this.retrieveFormData();
        this.needsStudentNumber = false; // IMPORTANT
        if (!data.name && !data.student_number) {
            return;
        }
        this.courseService.register(this.courseId, data).subscribe(
            courseRegResponse => {
                if (courseRegResponse.bad_request) {
                    this.sendErrorMessage();
                } else {
                    this.setRegistrationStage(courseRegResponse);
                }
            }
        );
    }

    /**
     * Method to submit the verify step
     */
    verifyStepSubmit(): void {
        const data = this.retrieveFormData();
        if (!data.code) {
            return;
        }
        this.courseService.registerVerify(this.courseId, data).subscribe(
            courseRegResponse => {
                if (courseRegResponse.bad_request) {
                    this.sendErrorMessage();
                } else {
                    this.setRegistrationStage(courseRegResponse);
                }
            }
        );
    }

    /**
     * Returns the formatted form data ready to send to the API
     */
    retrieveFormData(): CourseRegistrationRequest {
        return {
            name: this.nameForm.get('nameControl').value || null,
            confirmed_name: this.serverGuessedName || null,
            student_number: String(this.studentNumberForm.get('studentNumberControl').value) || null,
            code: this.verifyForm.get('verifyControl').value || null,
        };
    }

    /**
     * Proceeds to the next step
     */
    nextStep(): void {
        this.stepper.selected.completed = true;
        this.stepper.next();
    }

    /**
     * Sends out a toastr error message
     */
    sendErrorMessage(): void {
        this.toastr.error('Something went wrong. Check that your inputted values are accurate and try again.');
    }

    /**
     * Resets the stepper and clears all values
     */
    reset(): void {
        this.serverGuessedName = null;
        this.stepper.reset();
    }
}
