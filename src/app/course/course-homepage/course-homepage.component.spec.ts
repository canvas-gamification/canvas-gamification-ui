import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseHomepageComponent} from './course-homepage.component'
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/course.service.mock"
import {ActivatedRoute} from "@angular/router"
import {MOCK_COURSE1} from "@app/course/_test/mock"

describe('CourseHomepageComponent', () => {
    let component: CourseHomepageComponent
    let fixture: ComponentFixture<CourseHomepageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CourseHomepageComponent],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock}
                ,
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            parent: {
                                params: {
                                    courseId: 0
                                }
                            }
                        }
                    }
                }
            ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseHomepageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('course should be retrieved on initial load', () => {
        expect(component.course).toEqual(MOCK_COURSE1)
    })
})
