import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseChallengeSnippetComponent} from './course-challenge-snippet.component'
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/course.service.mock"
import {ActivatedRoute} from "@angular/router"
import {MOCK_COURSE1} from "@app/course/_test/mock"

describe('CourseChallengeSnippetComponent', () => {
    let component: CourseChallengeSnippetComponent
    let fixture: ComponentFixture<CourseChallengeSnippetComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CourseChallengeSnippetComponent],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock},
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
        fixture = TestBed.createComponent(CourseChallengeSnippetComponent)
        component = fixture.componentInstance
        component.events = []
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('course should be retrieved on initial load', () => {
        expect(component.course).toEqual(MOCK_COURSE1)
    })
})
