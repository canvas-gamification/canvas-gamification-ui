import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsEditSnippetComponent} from '../../problem-edit/parsons-edit-snippet/parsons-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_MCQ_QUESTION} from '@app/problems/_test/mock';

describe('ParsonsEditSnippetComponent', () => {
    let component: ParsonsEditSnippetComponent;
    let fixture: ComponentFixture<ParsonsEditSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ParsonsEditSnippetComponent);
        component = fixture.componentInstance;
        component.questionDetails = MOCK_MCQ_QUESTION;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
