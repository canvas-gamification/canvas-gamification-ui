import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TokenUseSnippetComponent} from '../../token-use-snippet/token-use-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_COURSE_REGISTRATION, MOCK_TOKEN_USE1} from "@app/course/_test/mock";
import {ActivatedRoute} from "@angular/router";
import {TokenUseService} from "@app/course/_services/token-use.service";
import {TokenUseServiceMock} from "@app/course/_test/_services/token-use.service.mock";
import {CourseModule} from "@app/course/course.module";

describe('TokenUseSnippetComponent', () => {
    let component: TokenUseSnippetComponent;
    let fixture: ComponentFixture<TokenUseSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, CourseModule],
            declarations: [TokenUseSnippetComponent],
            providers: [
                {provide: TokenUseService, useClass: TokenUseServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            params: {
                                courseId: 1
                            }
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TokenUseSnippetComponent);
        component = fixture.componentInstance;
        component.courseReg = MOCK_COURSE_REGISTRATION;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('confirm Changes should work', () => {
        component.useToken(MOCK_TOKEN_USE1, 1);
        component.confirmChanges();
        const editedTokenUses = MOCK_COURSE_REGISTRATION.token_uses;
        editedTokenUses[0].num_used++;
        expect(component.tokenUses).toEqual(editedTokenUses);
    });
});
