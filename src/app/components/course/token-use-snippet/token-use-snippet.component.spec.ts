import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TokenUseSnippetComponent} from './token-use-snippet.component';
import {TestModule} from '../../../../test/test.module';

describe('TokenUseSnippetComponent', () => {
    let component: TokenUseSnippetComponent;
    let fixture: ComponentFixture<TokenUseSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TokenUseSnippetComponent);
        component = fixture.componentInstance;
        component.courseReg = {
            id: 1,
            available_tokens: 100,
            canvas_user_id: 1,
            is_blocked: false,
            is_verified: true,
            token_uses: [],
            total_tokens_received: 50
        }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
