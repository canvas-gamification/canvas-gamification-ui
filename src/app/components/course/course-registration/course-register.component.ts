import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {CourseService} from '@app/_services/api/course/course.service';
import {ToastrService} from "ngx-toastr";
import {CourseRegistrationResponse, REGISTRATION_STATUS} from '@app/_models';

const STEPPER_STAGES = {
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
                private formBuilder: FormBuilder,
                private courseService: CourseService,
                private toastr: ToastrService) {
        this.route.params.subscribe(params => {
            this.courseId = params.courseId;
        });
        this.needsStudentNumber = false;
        this.verification = false;
        this.completed = false;
        this.editable = false;
    }

    ngOnInit(): void {
        this.nameForm = this.formBuilder.group({
            nameControl: ['', Validators.required]
        });
        this.confirmNameForm = this.formBuilder.group({
            confirmNameControl: ['']
        });
        this.studentNumberForm = this.formBuilder.group({
            studentNumberControl: ['', Validators.required]
        });
        this.verifyForm = this.formBuilder.group({
            verifyControl: ['', Validators.required]
        });
        this.getRegistrationStatus();
    }

    getRegistrationStatus(): void {
        this.courseService.getCourseRegistrationStatus(this.courseId).subscribe(
            courseRegistrationStatus => {
                // the api only responds with a non-null message value if the user is blocked from registering, thus the "danger" type
                if (courseRegistrationStatus.message) {
                    this.toastr.error(courseRegistrationStatus.message)
                }
                this.initialStage(courseRegistrationStatus.status);
            }
        );
    }

    initialStage(status: string): void {
        this.completed = status === REGISTRATION_STATUS.REGISTERED;
        this.verification = status === REGISTRATION_STATUS.AWAIT_VERIFICATION;

        this.selectedIndex = status === REGISTRATION_STATUS.REGISTERED ? STEPPER_STAGES.REGISTERED :
            status === REGISTRATION_STATUS.AWAIT_VERIFICATION ? STEPPER_STAGES.VERIFICATION :
                STEPPER_STAGES.ENTER_NAME;
    }

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

    retrieveFormData(): { name: string, confirmed_name: string, student_number: number, code: number } {
        return {
            name: this.nameForm.get('nameControl').value || null,
            confirmed_name: this.serverGuessedName || null,
            student_number: this.studentNumberForm.get('studentNumberControl').value || null,
            code: this.verifyForm.get('verifyControl').value || null,
        };
    }

    nextStep(): void {
        this.stepper.selected.completed = true;
        this.stepper.next();
    }

    sendErrorMessage(): void {
        this.toastr.error('Something went wrong. Check that your inputted values are accurate and try again.');
    }

    reset(): void {
        this.serverGuessedName = null;
        this.stepper.reset();
    }
}
