import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseListComponent} from '../../course-list/course-list.component';
import {TestModule} from '@test/test.module';
import {CourseService} from "@app/course/_services/course.service";
import {CourseServiceMock} from "@test/course.service.mock";
import {MOCK_COURSE} from "@app/problems/_test/mock";

describe('CourseListComponent', () => {
    let component: CourseListComponent;
    let fixture: ComponentFixture<CourseListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [CourseListComponent],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('courses should be loaded after view init', () => {
        component.ngAfterViewInit();
        expect(component.allCourses).toEqual([MOCK_COURSE]);
    });
});
