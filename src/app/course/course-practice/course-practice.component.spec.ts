import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CoursePracticeComponent} from './course-practice.component'
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/course.service.mock"
import {MOCK_COURSE1} from "@app/course/_test/mock"
import {ActivatedRoute} from "@angular/router"

describe('CoursePracticeComponent', () => {
    let component: CoursePracticeComponent
    let fixture: ComponentFixture<CoursePracticeComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CoursePracticeComponent],
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
        fixture = TestBed.createComponent(CoursePracticeComponent)
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
