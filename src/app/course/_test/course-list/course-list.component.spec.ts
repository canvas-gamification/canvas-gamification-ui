import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseListComponent} from '../../course-list/course-list.component';
import {TestModule} from '@test/test.module';
import {CourseService} from "@app/course/_services/course.service";
import {CourseServiceMock} from "@test/course.service.mock";
import {MOCK_COURSE} from "@app/problems/_test/mock";
import {MatTableModule} from "@angular/material/table";
import {TuiFilterPipeModule} from "@taiga-ui/cdk";
import {TuiInputModule, TuiIslandModule, TuiTagModule} from "@taiga-ui/kit";
import {TuiLoaderModule} from "@taiga-ui/core";
import {UserHasCourseViewPermissionsPipe} from "@app/_helpers/pipes/user-has-course-view-permissions.pipe";
import {CourseIslandModule} from "@app/components/course-island/course-island.module";
import {MOCK_COURSES, MOCK_USER_STUDENT} from "@app/course/_test/mock";

describe('CourseListComponent', () => {
    let component: CourseListComponent;
    let fixture: ComponentFixture<CourseListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestModule, MatTableModule, TuiInputModule, TuiLoaderModule,
                TuiFilterPipeModule, TuiTagModule, TuiIslandModule, CourseIslandModule
            ],
            declarations: [CourseListComponent, UserHasCourseViewPermissionsPipe],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseListComponent);
        component = fixture.componentInstance;
        component.allCourses = MOCK_COURSES;
        component.user = MOCK_USER_STUDENT;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('courses should be loaded on view init', () => {
        component.ngOnInit();
        expect(component.allCourses).toEqual([MOCK_COURSE]);
    });
});
