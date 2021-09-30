import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseRegistrationStepComponent} from '../../../course-registration/course-registration-step/course-registration-step.component';
import {CourseRegistrationStepperComponent} from "@app/course/course-registration/course-registration-stepper/course-registration-stepper.component";
import {TestModule} from "@test/test.module";
import {TuiStepperComponent} from "@taiga-ui/kit";

describe('CourseRegistrationStepComponent', () => {
    let component: CourseRegistrationStepComponent;
    let fixture: ComponentFixture<CourseRegistrationStepComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [CourseRegistrationStepComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseRegistrationStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show step', () => {
        component.stepNumber = 0;
        component.stepper = new CourseRegistrationStepperComponent();
        component.stepper.stepperComponent = new TuiStepperComponent();
        fixture.detectChanges();
        expect(component.showStep()).toBeTrue();
    });

    it('should not show step', () => {
        component.stepNumber = 1;
        fixture.detectChanges();
        expect(component.showStep()).toBeFalse();
    });
});
