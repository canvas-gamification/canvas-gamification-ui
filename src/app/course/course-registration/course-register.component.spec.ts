import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseRegisterComponent} from './course-register.component';
import {TestModule} from '@test/test.module';

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
});
