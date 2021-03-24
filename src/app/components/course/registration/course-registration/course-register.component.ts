import {Component, OnInit, ViewChild} from '@angular/core';
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
                private messageService: MessageService) {
        this.route.params.subscribe(params => {
            this.courseId = params.courseId;
        });
        this.needsStudentNumber = false;
        this.completed = false;
        this.verification = false;
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
                const messageContent = courseRegistrationStatus.message;
                // the api only responds with a non-null message value if the user is blocked from registering, thus the "danger" type
                if (messageContent) {
                    this.messageService.add('danger', messageContent);
                }
                this.initialStage(courseRegistrationStatus.status);
            }
        );
    }

    initialStage(status: string): void {
        switch (status) {
            case REGISTRATION_STATUS.REGISTERED:
                this.selectedIndex = REGISTRATION_STAGES.REGISTERED;
                this.completed = true;
                break;
            case REGISTRATION_STATUS.AWAIT_VERIFICATION:
                this.selectedIndex = REGISTRATION_STAGES.VERIFICATION;
                this.verification = true;
                break;
            case REGISTRATION_STATUS.NOT_REGISTERED:
                this.selectedIndex = REGISTRATION_STAGES.ENTER_NAME;
                break;
        }
    }

    setRegistrationStage(courseRegResponse: CourseRegistrationResponse): void {
        this.serverGuessedName = courseRegResponse?.guessed_name;
        this.attemptsRemaining = courseRegResponse?.attempts_remaining;
        if (courseRegResponse.success) {
            this.progress();
        }
        if (this.stepper.selectedIndex === REGISTRATION_STAGES.ENTER_NAME) {
            if (!courseRegResponse.success) {
                this.needsStudentNumber = true;
                this.progress();
            }
        } else {
            this.selectedIndex = REGISTRATION_STAGES.ENTER_NAME;
        }
    }

    registerStepSubmit(): void {
        const data = this.retrieveFormData();
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

    retrieveFormData(): any {
        return {
            name: this.nameForm.get('nameControl').value || null,
            confirmed_name: this.serverGuessedName || null,
            student_number: String(this.studentNumberForm.get('studentNumberControl').value) || null,
            code: this.verifyForm.get('verifyControl').value || null,
        };
    }

    progress(): void {
        this.stepper.selected.completed = true;
        this.stepper.selected.editable = false;
        this.stepper.next();
    }

    sendErrorMessage(): void {
        this.messageService.add('danger', 'Something went wrong. Check that your inputted values are accurate and try again.');
    }

    reset(): void {
        this.stepper.reset();
    }
}
