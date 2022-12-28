import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing'

import {CourseComponent} from '../../course.component'
import {TestModule} from '@test/test.module'
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/course.service.mock"
import {ActivatedRoute, Router} from "@angular/router"
import {MOCK_COURSE1} from "@app/course/_test/mock"
import {ConceptMapComponent} from "@app/course/concept-map/concept-map.component"
import {
    CourseEventsSnippetComponent
} from "@app/course/course-events-snippet/course-events-snippet.component"
import {LeaderBoardComponent} from "@app/course/leader-board/leader-board.component"
import {
    CourseQuestionSnippetComponent
} from "@app/course/course-question-snippet/course-question-snippet.component"
import {TokenUseSnippetComponent} from "@app/course/token-use-snippet/token-use-snippet.component"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {CourseEventServiceMock} from "@app/problems/_test/_services/course-event.service.mock"
import {UqjService} from "@app/problems/_services/uqj.service"
import {UqjServiceMock} from "@app/problems/_test/_services/uqj.service.mock"
import {RouterMock} from "@app/course/_test/_services/router.mock"

describe('CourseComponent Homepage', () => {
    let component: CourseComponent
    let fixture: ComponentFixture<CourseComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [
                CourseComponent,
                ConceptMapComponent,
                CourseQuestionSnippetComponent,
                CourseEventsSnippetComponent,
                TokenUseSnippetComponent,
                LeaderBoardComponent
            ],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: CourseEventService, useClass: CourseEventServiceMock},
                {provide: UqjService, useClass: UqjServiceMock},
                {provide: Router, useClass: RouterMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            params: {
                                courseId: 0
                            },
                            firstChild: {
                                data: {
                                    breadCrumbs: [{
                                        caption: `Homepage`,
                                        routerLink: '/course/:courseId/homepage'
                                    }]
                                },
                                params: {

                                }
                            },
                        }
                    }
                }
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('course should be retrieved on initial load', () => {
        expect(component.course).toEqual(MOCK_COURSE1)
    })

    it('should replace the :courseId in the breadcrumbs', fakeAsync(() => {
        expect(component.breadCrumbs).toEqual([{
            caption: `Homepage`,
            routerLink: '/course/0/homepage'
        }])
    }))
})

describe('CourseComponent Question Page', () => {
    let component: CourseComponent
    let fixture: ComponentFixture<CourseComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [
                CourseComponent,
                ConceptMapComponent,
                CourseQuestionSnippetComponent,
                CourseEventsSnippetComponent,
                TokenUseSnippetComponent,
                LeaderBoardComponent
            ],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: CourseEventService, useClass: CourseEventServiceMock},
                {provide: UqjService, useClass: UqjServiceMock},
                {provide: Router, useClass: RouterMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            params: {
                                courseId: 0
                            },
                            firstChild: {
                                data: {
                                    breadCrumbs: [{
                                        caption: `Homepage`,
                                        routerLink: '/course/:courseId/homepage'
                                    }, {
                                        caption: `Assignments and Exams`,
                                        routerLink: '/course/:courseId/assignments-exams'
                                    }, {
                                        caption: `:eventName`,
                                        routerLink:
                                            '/course/:courseId/assignments-exams/:eventId'
                                    }, {
                                        caption: `:questionName`,
                                        routerLink:
                                            '/course/:courseId/assignments-exams/:eventId/problem/:id'
                                    }]
                                },
                                params: {
                                    eventId: 1,
                                    id: 1,
                                }
                            },
                        }
                    }
                }
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('course should be retrieved on initial load', () => {
        expect(component.course).toEqual(MOCK_COURSE1)
    })

    // TODO: Fix this test (We don't know why it's failing)
    xit('should replace params in the url and caption in the breadcrumbs', fakeAsync(() => {
        expect(component.breadCrumbs).toEqual([{
            caption: `Homepage`,
            routerLink: '/course/0/homepage'
        }, {
            caption: `Assignments and Exams`,
            routerLink: '/course/0/assignments-exams'
        }, {
            caption: `Mock Event`,
            routerLink:
                '/course/0/assignments-exams/1'
        }, {
            caption: `MCQ Test`,
            routerLink:
                '/course/0/assignments-exams/1/problem/1'
        }])
    }))
})
