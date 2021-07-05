import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubmissionSnippetComponent} from '../../problem-view/submission-snippet/submission-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_QUESTION_SUBMISSION} from '@app/problems/_test/mock';

describe('SubmissionSnippetComponent', () => {
    let component: SubmissionSnippetComponent;
    let fixture: ComponentFixture<SubmissionSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SubmissionSnippetComponent);
        component = fixture.componentInstance;
        component.previousSubmissions = [MOCK_QUESTION_SUBMISSION];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
