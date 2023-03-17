import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseDashboardComponent} from './course-dashboard.component'
import {TestModule} from '@test/test.module'
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/_services/course.service.mock"

describe('CourseDashboardComponent', () => {
    let component: CourseDashboardComponent
    let fixture: ComponentFixture<CourseDashboardComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock}
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseDashboardComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
