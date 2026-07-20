import { TuiFilterPipe } from "@taiga-ui/cdk";
import { TuiIslandDirective, TuiInputModule, TuiTagModule } from "@taiga-ui/legacy";
import { TuiLoader } from "@taiga-ui/core";
import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseListComponent} from '../../course-list/course-list.component'
import {TestModule} from '@test/test.module'
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/_services/course.service.mock"
import {MOCK_COURSE} from "@app/problems/_test/mock"
import {MOCK_COURSES, MOCK_USER_STUDENT} from "@app/course/_test/mock"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {
    UserHasCourseViewPermissionsPipe
} from "@app/_helpers/pipes/user-has-course-view-permissions.pipe"
import {CourseIslandModule} from "@app/components/course-island/course-island.module"

describe('CourseListComponent', () => {
    let component: CourseListComponent
    let fixture: ComponentFixture<CourseListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestModule, ReactiveFormsModule, FormsModule,
                TuiInputModule, TuiLoader, TuiFilterPipe,
                TuiTagModule, TuiIslandDirective, CourseIslandModule
            ],
            declarations: [CourseListComponent, UserHasCourseViewPermissionsPipe],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock}
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseListComponent)
        component = fixture.componentInstance
        component.allCourses = MOCK_COURSES
        component.user = MOCK_USER_STUDENT
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('courses should be loaded on view init', () => {
        component.ngOnInit()
        expect(component.allCourses).toEqual([MOCK_COURSE])
    })
})
