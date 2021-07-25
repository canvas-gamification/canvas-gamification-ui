import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseEventCreateEditComponent} from './course-event-create-edit.component';
import {TestModule} from '@test/test.module';

describe('CourseEventCreateComponent', () => {
    let component: CourseEventCreateEditComponent;
    let fixture: ComponentFixture<CourseEventCreateEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseEventCreateEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
