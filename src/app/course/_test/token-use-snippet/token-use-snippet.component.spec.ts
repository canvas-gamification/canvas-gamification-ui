import {ComponentFixture, TestBed} from '@angular/core/testing'

import {TokenUseSnippetComponent} from '../../token-use-snippet/token-use-snippet.component'
import {TestModule} from '@test/test.module'
import {MOCK_COURSE_REGISTRATION, MOCK_TOKEN_USE1} from "@app/course/_test/mock"
import {ActivatedRoute} from "@angular/router"
import {TokenUseService} from "@app/course/_services/token-use.service"
import {TokenUseServiceMock} from "@app/course/_test/_services/token-use.service.mock"
import {CourseModule} from "@app/course/course.module"
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/_services/course.service.mock"

describe('TokenUseSnippetComponent', () => {
    let component: TokenUseSnippetComponent
    let fixture: ComponentFixture<TokenUseSnippetComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, CourseModule],
            declarations: [TokenUseSnippetComponent],
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

    it('should get courseReg on initial load', () =>{
        expect(component.courseReg).toEqual(MOCK_COURSE_REGISTRATION)
    })

    it('should get token uses on initial load', () =>{
        expect(component.tokenUses).toEqual(MOCK_COURSE_REGISTRATION.token_uses)
    })

    it('confirm Changes should work', () => {
        MOCK_TOKEN_USE1.num_used += 1
        component.confirmChanges()
        const editedTokenUses = MOCK_COURSE_REGISTRATION.token_uses
        editedTokenUses[0].num_used++
        expect(component.tokenUses).toEqual(editedTokenUses)
    })
})
