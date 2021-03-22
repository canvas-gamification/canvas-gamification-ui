import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {CourseService} from '@app/_services/api/course.service';
import {MessageService} from '@app/_services/message.service';
import {REGISTRATION_STATUS} from '@app/_models';

const REGISTRATION_STAGES = {
    ENTER_NAME: 1,
    CONFIRM_NAME: 2,
    STUDENT_NUMBER: 3,
    VERIFICATION: 4,
    SUCCESS: 5,
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
    studentNumberForm: FormGroup;
    courseId: number;
    needsStudentNumber: boolean;

    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private courseService: CourseService,
                private messageService: MessageService, ) {
        this.route.params.subscribe(params => {
            this.courseId = params.courseId;
        });
        this.needsStudentNumber = true;
    }

    ngOnInit(): void {
        this.nameForm = this.formBuilder.group({
            nameControl: ['', Validators.required]
        });
        this.studentNumberForm = this.formBuilder.group({
            studentNumberControl: ['', Validators.required]
        });
    }

    getRegistrationStatus(): void {
        this.courseService.getCourseRegistrationStatus(this.courseId).subscribe(
            courseRegistrationStatus => {
                const messageContent = courseRegistrationStatus.message;
                // the api only sends a non-null message value if the user is blocked from registering, thus the "danger" type
                if (messageContent) {
                    this.messageService.add('danger', messageContent);
                }
                this.setRegistrationStage(courseRegistrationStatus.status);
            }
        );
    }

    setRegistrationStage(registrationStatus: string): void {
        switch (registrationStatus) {
            case REGISTRATION_STATUS.NOT_REGISTERED:
                break;
            case REGISTRATION_STATUS.AWAIT_VERIFICATION:
                break;
            case REGISTRATION_STATUS.REGISTERED:
                break;
            default:
                break;
        }
    }

    registerStepSubmit(options: any): void {

    }
}
