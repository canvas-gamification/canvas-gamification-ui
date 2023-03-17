import {ComponentFixture, TestBed} from '@angular/core/testing'

import {InactiveCoursesComponent} from './inactive-courses.component'
import {TestModule} from '@test/test.module'
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/_services/course.service.mock"

describe('InactiveCoursesComponent', () => {
    let component: InactiveCoursesComponent
    let fixture: ComponentFixture<InactiveCoursesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock}
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(InactiveCoursesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
