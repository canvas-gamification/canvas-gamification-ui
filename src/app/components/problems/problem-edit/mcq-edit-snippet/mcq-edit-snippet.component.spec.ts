import {ComponentFixture, TestBed} from '@angular/core/testing';

import {McqEditSnippetComponent} from './mcq-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_QUESTION} from '@test/mock';

describe('McqEditSnippetComponent', () => {
    let component: McqEditSnippetComponent;
    let fixture: ComponentFixture<McqEditSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(McqEditSnippetComponent);
        component = fixture.componentInstance;
        component.QuestionDetails = MOCK_QUESTION;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
