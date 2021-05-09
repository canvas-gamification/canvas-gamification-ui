import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubmissionSnippetComponent} from './submission-snippet.component';
import {TestModule} from '../../../../../test/test.module';
import {MOCK_QUESTION_SUBMISSION} from '../../../../../test/mock';

describe('SubmissionSnippetComponent', () => {
    let component:    missionSnippetComponent;
    let fixture: C    nentFixture<SubmissionSnippetComponent>;

    beforeEach(asy    ) => {
        await Test        igureTestingModule({
            import            le]
        }).compile        ts();
    });

    befor    h(()
        fixture =         createComponent(SubmissionSnippetComponent);
        component         e.componentInstance;
        component.        Submissions = [MOCK_QUESTION_SUBMISSION]
        fixture.de        ges();
    });

    it('s    d cre    , () => {
        expect(com        toBeTruthy();
    });
});
