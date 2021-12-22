import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseListComponent} from '../../course-list/course-list.component';
import {TestModule} from '@test/test.module';
import {CourseService} from "@app/course/_services/course.service";
import {CourseServiceMock} from "@test/course.service.mock";
import {MOCK_COURSE} from "@app/problems/_test/mock";
import {MOCK_COURSE1, MOCK_COURSE2, MOCK_COURSES, MOCK_USER_STUDENT, MOCK_USER_TEACHER} from "@app/course/_test/mock";
import {MatTableModule} from "@angular/material/table";
import {TuiFilterPipeModule} from "@taiga-ui/cdk";
import {TuiInputModule, TuiIslandModule, TuiTagModule} from "@taiga-ui/kit";
import {TuiLoaderModule} from "@taiga-ui/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('CourseListComponent', () => {
    let component: CourseListComponent;
    let fixture: ComponentFixture<CourseListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestModule, ReactiveFormsModule, FormsModule,
                MatTableModule, TuiInputModule, TuiLoaderModule,
                TuiFilterPipeModule, TuiTagModule, TuiIslandModule
            ],
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

    it('courses should be loaded on view init', () => {
        component.ngOnInit();
        expect(component.allCourses).toEqual([MOCK_COURSE]);
    });

    it('hasViewPermission should work for Teacher', () => {
        component.user = MOCK_USER_TEACHER;
        expect(component.hasViewPermission(MOCK_COURSE.id)).toEqual(true);
    });

    it('hasViewPermission should work for Registered student', () => {
        component.user = MOCK_USER_STUDENT;
        component.allCourses = MOCK_COURSES;
        expect(component.hasViewPermission(MOCK_COURSE1.id)).toEqual(true);
    });

    it('hasViewPermission should work for Non-Registered student', () => {
        component.user = MOCK_USER_STUDENT;
        component.allCourses = MOCK_COURSES;
        expect(component.hasViewPermission(MOCK_COURSE2.id)).toEqual(false);
    });
});
