import {ComponentFixture, TestBed} from '@angular/core/testing';

import {McqEditSnippetComponent} from '../../problem-edit/mcq-edit-snippet/mcq-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_MCQ_QUESTION} from '@app/problems/_test/mock';

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
        component.questionDetails = MOCK_MCQ_QUESTION;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
