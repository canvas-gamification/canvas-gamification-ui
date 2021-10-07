import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseRegisterComponent, STEPPER_STAGES} from '../../course-registration/course-register.component';
import {TestModule} from '@test/test.module';
import {REGISTRATION_STATUS} from "@app/_models";
import {CourseService} from "@app/course/_services/course.service";
import {CourseServiceMock} from "@test/course.service.mock";
import {MatStepperModule} from "@angular/material/stepper";
import {ActivatedRoute} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MOCK_IDENTIFICATION_RESPONSE1, MOCK_VERIFY_FAIL} from "@app/course/_test/mock";
import {TuiNotificationsService} from "@taiga-ui/core";
import {of} from "rxjs";

describe('RegisterComponent', () => {
    let component: CourseRegisterComponent;
    let fixture: ComponentFixture<CourseRegisterComponent>;
    let notificationService: TuiNotificationsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, MatStepperModule, ReactiveFormsModule],
            declarations: [CourseRegisterComponent],
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
        notificationService = TestBed.inject(TuiNotificationsService);
        spyOn(notificationService, 'show').and.callFake(() => {
            return of();
        });
        fixture = TestBed.createComponent(CourseRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('initialStage should work', () => {
        component.initialStage(REGISTRATION_STATUS.REGISTERED);
        expect(component.completed).toBeTrue();
        expect(component.verification).toBeFalse();
        expect(component.selectedIndex).toEqual(STEPPER_STAGES.REGISTERED);
    });

    it('getRegistrationStatus should work and call appropriate methods', () => {
        spyOn(component, 'initialStage');
        component.getRegistrationStatus();
        expect(component.initialStage).toHaveBeenCalledOnceWith(REGISTRATION_STATUS.NOT_REGISTERED);
    });

    it('nextStep should work', () => {
        spyOn(component.stepper, 'next');
        component.nextStep();
        expect(component.stepper.selected.completed).toBeTrue();
        expect(component.stepper.next).toHaveBeenCalled();
    });

    it('reset should work', () => {
        spyOn(component.stepper, 'reset');
        component.reset();
        expect(component.serverGuessedName).toBeNull();
        expect(component.stepper.reset).toHaveBeenCalled();
    });

    it('retrieveFormData should work', () => {
        expect(component.retrieveFormData()).toBeTruthy();
    });

    it('sendErrorMessage should work', () => {
        component.sendErrorMessage();
        expect(notificationService.show).toHaveBeenCalled();
    });

    it('setRegistrationStage should work', () => {
        spyOn(component, 'nextStep');
        component.setRegistrationStage(MOCK_IDENTIFICATION_RESPONSE1);
        expect(component.nextStep).toHaveBeenCalled();
    });

    it('setRegistrationStage should work when there is no success', () => {
        spyOn(component, 'nextStep');
        component.stepper.selectedIndex = 0;
        component.setRegistrationStage(MOCK_VERIFY_FAIL);
        expect(component.needsStudentNumber).toBeTrue();
        expect(component.nextStep).toHaveBeenCalled();
    });

    it('registerStepSubmit should work', () => {
        spyOn(component, 'setRegistrationStage');
        component.nameForm.get('nameControl').setValue('Test');
        component.registerStepSubmit();
        expect(component.setRegistrationStage).toHaveBeenCalledOnceWith({success: true});
    });

    it('verifyStepSubmit should work', () => {
        spyOn(component, 'setRegistrationStage');
        component.verifyForm.get('verifyControl').setValue('1234');
        component.verifyStepSubmit();
        expect(component.setRegistrationStage).toHaveBeenCalledOnceWith({success: true});
    });
});
