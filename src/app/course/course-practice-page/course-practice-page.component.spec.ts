import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CoursePracticePageComponent} from './course-practice-page.component'
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/course.service.mock"
import {MOCK_COURSE1} from "@app/course/_test/mock"
import {ActivatedRoute} from "@angular/router"

describe('CoursePracticeComponent', () => {
    let component: CoursePracticePageComponent
    let fixture: ComponentFixture<CoursePracticePageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CoursePracticePageComponent],
            providers: [{
                provide: CourseService, useClass: CourseServiceMock
            },
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
            }]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CoursePracticePageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('course should be loaded on initialization', () => {
        expect(component.course).toEqual(MOCK_COURSE1)
    })
})
