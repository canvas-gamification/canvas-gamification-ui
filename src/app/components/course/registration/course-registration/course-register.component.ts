import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {CourseService} from '@app/_services/api/course.service';
import {MessageService} from '@app/_services/message.service';
import {CourseRegistrationResponse, REGISTRATION_STATUS} from '@app/_models';

const REGISTRATION_STAGES = {
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
    nameForm: FormGroup;
    confirmNameForm: FormGroup;
    studentNumberForm: FormGroup;
    verifyForm: FormGroup;

    courseId: number;
    needsStudentNumber: boolean;
    selectedIndex: number;
    guessedName: string;
    attemptsRemaining: number;
    editable = true;

    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private courseService: CourseService,
                private messageService: MessageService) {
        this.route.params.subscribe(params => {
            this.courseId = params.courseId;
        });
        this.needsStudentNumber = false;
    }

    ngOnInit(): void {
        this.nameForm = this.formBuilder.group({
            nameControl: ['', Validators.required]
        });
        this.confirmNameForm = this.formBuilder.group({
            confirmNameControl: ['', Validators.required]
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
                const messageContent = courseRegistrationStatus.message;
                // the api only sends a non-null message value if the user is blocked from registering, thus the "danger" type
                if (messageContent) {
                    this.messageService.add('danger', messageContent);
                }
                this.initialStage(courseRegistrationStatus.status);
            }
        );
    }

    initialStage(status: string): void {
        console.log(status);
        switch (status) {
            case REGISTRATION_STATUS.REGISTERED:
                this.selectedIndex = REGISTRATION_STAGES.REGISTERED;
                this.editable = false;
                break;
            case REGISTRATION_STATUS.AWAIT_VERIFICATION:
                this.selectedIndex = REGISTRATION_STAGES.VERIFICATION;
                break;
            case REGISTRATION_STATUS.NOT_REGISTERED:
                this.selectedIndex = REGISTRATION_STAGES.ENTER_NAME;
                break;
        }
    }

    // this.selectedIndex = needStudentNumber ? REGISTRATION_STAGES.STUDENT_NUMBER : REGISTRATION_STAGES.CONFIRM_NAME;
    setRegistrationStage(courseRegResponse: CourseRegistrationResponse): void {
        switch (this.selectedIndex) {
            case REGISTRATION_STAGES.ENTER_NAME:
                if (courseRegResponse?.success) {
                    this.guessedName = courseRegResponse?.guessed_name;
                    this.selectedIndex = REGISTRATION_STAGES.CONFIRM_IDENTITY;
                } else {
                    this.needsStudentNumber = true;
                    this.selectedIndex = REGISTRATION_STAGES.CONFIRM_IDENTITY;
                }
                break;
            case REGISTRATION_STAGES.CONFIRM_IDENTITY:
                if (courseRegResponse?.success) {
                    this.selectedIndex = REGISTRATION_STAGES.VERIFICATION;
                }
                break;
            case REGISTRATION_STAGES.VERIFICATION:
                if (courseRegResponse?.success) {
                    this.attemptsRemaining = courseRegResponse.attempts_remaining;
                    this.editable = false;
                    this.selectedIndex = REGISTRATION_STAGES.REGISTERED;
                }
                break;
            default:
                // if the user is not registered (or has any other course registration status, send them to the beginning of the form)
                this.selectedIndex = REGISTRATION_STAGES.ENTER_NAME;
                break;
        }
    }

    registerStepSubmit(): void {
        const data = {
            name: this.nameForm.get('nameControl').value || null,
            confirmed_name: this.confirmNameForm.get('confirmNameControl').value || null,
            student_number: this.studentNumberForm.get('studentNumberControl').value || null,
            code: this.verifyForm.get('verifyControl').value || null,
        };
        console.log(this.selectedIndex);
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
        const data = {};
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

    sendErrorMessage(): void {
        this.messageService.add('danger', 'Something went wrong. Check that your inputted values are accurate and try again.');
    }

    previousStep() {
        this.selectedIndex += -1;
        console.log(this.selectedIndex);
    }
}
