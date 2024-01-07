import {ComponentFixture, TestBed} from '@angular/core/testing'

import {TokenUseSnippetComponent} from '../../token-use-snippet/token-use-snippet.component'
import {TestModule} from '@test/test.module'
import {
    MOCK_COURSE1,
    MOCK_GRADE_BOOK1,
} from "@app/course/_test/mock"
import {ActivatedRoute} from "@angular/router"
import {TokenUseService} from "@app/course/_services/token-use.service"
import {TokenUseServiceMock} from "@app/course/_test/_services/token-use.service.mock"
import {CourseModule} from "@app/course/course.module"
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/_services/course.service.mock"
import {MOCK_USER} from "@test/mock"
import {AuthenticationService} from "@app/_services/api/authentication"
import {AuthenticationServiceMock} from "@test/_services/authentication.service.mock"
import {MOCK_COURSE_EVENT} from "@app/problems/_test/mock";

describe('TokenUseSnippetComponentStudent', () => {
    let component: TokenUseSnippetComponent
    let fixture: ComponentFixture<TokenUseSnippetComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, CourseModule],
            declarations: [TokenUseSnippetComponent],
            providers: [
                {provide: AuthenticationService, useClass: AuthenticationServiceMock},
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: TokenUseService, useClass: TokenUseServiceMock},
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
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(TokenUseSnippetComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should get course on initial load', () =>{
        expect(component.course).toEqual(MOCK_COURSE1)
    })

    it('should get user on initial load', () =>{
        expect(component.user).toEqual(MOCK_USER)
    })

    it('should detect user is student on initial load', () => {
        expect(component.isInstructor).toEqual(false)
    })

    it('should get grade book on initial load', () => {
        expect(component.grades).toEqual(MOCK_GRADE_BOOK1)
        expect(component.gradesDisplayData).toEqual(MOCK_GRADE_BOOK1)
    })

    it('should filter grade book by assignment', () => {
        component.update({event: MOCK_COURSE_EVENT.name})
        expect(component.gradesDisplayData.length).toEqual(1)
        expect(component.gradesDisplayData[0].event_name).toEqual(MOCK_COURSE_EVENT.name)
    })
})

describe('TokenUseSnippetComponentInstructor', () => {
    let component: TokenUseSnippetComponent
    let fixture: ComponentFixture<TokenUseSnippetComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, CourseModule],
            declarations: [TokenUseSnippetComponent],
            providers: [
                {provide: AuthenticationService, useClass: AuthenticationServiceMock},
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: TokenUseService, useClass: TokenUseServiceMock},
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
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(TokenUseSnippetComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    // TODO: Write tests for when user is a teacher
})
