import {ComponentFixture, TestBed} from '@angular/core/testing'

import {IndividualTokensComponent} from './individual-tokens.component'
import {TestModule} from "@test/test.module"
import {CourseModule} from "@app/course/course.module"
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/_services/course.service.mock"
import {TokenUseService} from "@app/course/_services/token-use.service"
import {TokenUseServiceMock} from "@app/course/_test/_services/token-use.service.mock"
import {ActivatedRoute} from "@angular/router"
import {MOCK_COURSE1, MOCK_GRADE_BOOK1} from "@app/course/_test/mock"
import {MOCK_COURSE_EVENT} from "@app/problems/_test/mock"

describe('IndividualTokenComponentComponent', () => {
    let component: IndividualTokensComponent
    let fixture: ComponentFixture<IndividualTokensComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, CourseModule],
            declarations: [IndividualTokensComponent],
            providers: [
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
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(IndividualTokensComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should get course on initial load', () => {
        expect(component.course).toEqual(MOCK_COURSE1)
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
