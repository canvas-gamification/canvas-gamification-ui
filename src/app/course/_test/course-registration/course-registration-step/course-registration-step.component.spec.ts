import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseRegistrationStepComponent} from '../../../course-registration/course-registration-step/course-registration-step.component';
import {TestModule} from "@test/test.module";

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

    it('should initiate not visible', () => {
        expect(component.visible).toBeFalse();
    });
});
