import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseRegisterComponent, STEPPER_STAGES} from '../../course-registration/course-register.component';
import {TestModule} from '@test/test.module';
import {REGISTRATION_STATUS} from "@app/_models";

describe('RegisterComponent', () => {
    let component: CourseRegisterComponent;
    let fixture: ComponentFixture<CourseRegisterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
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
});
