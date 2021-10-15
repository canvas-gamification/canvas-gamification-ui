import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseRegisterComponent} from '../../course-registration/course-register.component';
import {TestModule} from '@test/test.module';
import {CourseService} from "@app/course/_services/course.service";
import {CourseServiceMock} from "@test/course.service.mock";
import {ActivatedRoute} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {
    MOCK_CONFIRM_RESPONSE1,
    MOCK_CONFIRM_STEP1,
    MOCK_CONFIRM_STEP2_SUCCESS,
    MOCK_IDENTIFICATION_RESPONSE2,
    MOCK_IDENTIFICATION_STEP1,
    MOCK_IDENTIFICATION_STEP2,
    MOCK_VERIFY_STEP1,
    MOCK_VERIFY_SUCCESS
} from "@app/course/_test/mock";
import {CourseRegistrationStepperComponent} from "@app/course/course-registration/course-registration-stepper/course-registration-stepper.component";
import {CourseRegistrationStepComponent} from "@app/course/course-registration/course-registration-step/course-registration-step.component";
import {TuiFieldErrorModule, TuiInputModule, TuiStepperModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";

describe('CourseRegisterComponent', () => {
    let component: CourseRegisterComponent;
    let fixture: ComponentFixture<CourseRegisterComponent>;
    let toastr: ToastrService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, ReactiveFormsModule, TuiStepperModule, TuiInputModule, TuiTextfieldControllerModule, TuiFieldErrorModule],
            declarations: [CourseRegisterComponent, CourseRegistrationStepperComponent, CourseRegistrationStepComponent],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            params: {
                                courseId: 0
                            }
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        toastr = TestBed.inject(ToastrService);
        spyOn(toastr, 'error');
        fixture = TestBed.createComponent(CourseRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get correct step number', () => {
        expect(component.stepper.currentStep).toEqual(0);
    });

    it('should get registration status on init', () => {
        spyOn(component, 'getRegistrationStatus');
        component.ngOnInit();
        expect(component.getRegistrationStatus).toHaveBeenCalled();
    });

    it('should generate course registration request with form data', () => {
        component.nameForm.get('nameControl').setValue(MOCK_IDENTIFICATION_STEP1.name);
        expect(component.generateCourseRegistrationRequest()).toEqual({
            name: MOCK_IDENTIFICATION_STEP1.name,
            confirmed_name: null,
            student_number: null,
            code: null,
        });
    });

    it('should send an error message', () => {
        component.sendErrorMessage();
        expect(toastr.error).toHaveBeenCalled();
    });

    it('should register', () => {
        spyOn(component, 'setStepperStatusFromRegistration');
        component.nameForm.get('nameControl').setValue(MOCK_CONFIRM_STEP1.name);
        component.confirmNameForm.get('confirmNameControl').setValue(MOCK_CONFIRM_STEP1.name);
        component.registerAndUpdateStepper(component.generateCourseRegistrationRequest());
        expect(component.setStepperStatusFromRegistration).toHaveBeenCalledWith(MOCK_CONFIRM_RESPONSE1);
    });

    it('should verify registration', () => {
        spyOn(component, 'setStepperStatusFromRegistration');
        component.nameForm.get('nameControl').setValue(MOCK_VERIFY_STEP1.name);
        component.confirmNameForm.get('confirmNameControl').setValue(MOCK_VERIFY_STEP1.name);
        component.verifyForm.get('verifyControl').setValue(MOCK_VERIFY_STEP1.code);
        component.verifyRegistrationAndUpdateStepper(component.generateCourseRegistrationRequest());
        expect(component.setStepperStatusFromRegistration).toHaveBeenCalledWith(MOCK_VERIFY_SUCCESS);
    });

    it('should set stepper status', () => {
        spyOn(component.stepper, 'setNextStep');
        component.setStepperStatusFromRegistration(MOCK_CONFIRM_RESPONSE1);
        expect(component.stepper.setNextStep).toHaveBeenCalled();
    });

    it('should set stepper status multiple student', () => {
        spyOn(component.stepper, 'setNextStep');
        component.setStepperStatusFromRegistration(MOCK_IDENTIFICATION_RESPONSE2);
        expect(component.needsStudentNumber).toBeTrue();
        expect(component.stepper.setNextStep).toHaveBeenCalled();
    });

    it('should reset form values', () => {
        component.resetFormValues();
        expect(component.serverGuessedName).toBeNull();
    });

    it('should activate name form submission', () => {
        spyOn(component, 'registerAndUpdateStepper');
        component.nameForm.get('nameControl').setValue(MOCK_IDENTIFICATION_STEP2.name);
        component.onNameFormSubmit();
        expect(component.registerAndUpdateStepper).toHaveBeenCalledWith(component.generateCourseRegistrationRequest());
    });

    it('should activate confirmation form submission', () => {
        spyOn(component, 'registerAndUpdateStepper');
        component.nameForm.get('nameControl').setValue(MOCK_CONFIRM_STEP2_SUCCESS.name);
        component.studentNumberForm.get('studentNumberControl').setValue(MOCK_CONFIRM_STEP2_SUCCESS.student_number);
        component.onConfirmationFormSubmit();
        expect(component.registerAndUpdateStepper).toHaveBeenCalledWith(component.generateCourseRegistrationRequest());
    });

    it('should activate verification form submission', () => {
        spyOn(component, 'verifyRegistrationAndUpdateStepper');
        component.nameForm.get('nameControl').setValue(MOCK_VERIFY_STEP1.name);
        component.confirmNameForm.get('confirmNameControl').setValue(MOCK_VERIFY_STEP1.name);
        component.verifyForm.get('verifyControl').setValue(MOCK_VERIFY_STEP1.code);
        component.onVerificationFormSubmit();
        expect(component.verifyRegistrationAndUpdateStepper).toHaveBeenCalledWith(component.generateCourseRegistrationRequest());
    });
});
