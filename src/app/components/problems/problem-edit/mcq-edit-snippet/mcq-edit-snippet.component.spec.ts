import {ComponentFixture, TestBed} from '@angular/core/testing';

import {McqEditSnippetComponent} from './mcq-edit-snippet.component';
import {TestModule} from '../../../../../test/test.module';
import {MOCK_QUESTION} from '../../../../../test/mock';

describe('McqEditSnippetComponent', () => {
    let component:    EditSnippetComponent;
    let fixture: C    nentFixture<McqEditSnippetComponent>;

    beforeEach(asy    ) => {
        await Test        igureTestingModule({
            import            le]
        }).compile        ts();
    });

    befor    h(()
        fixture =         createComponent(McqEditSnippetComponent);
        component         e.componentInstance;
        component.        Details = MOCK_QUESTION
        fixture.de        ges();
    });

    it('s    d cre    , () => {
        expect(com        toBeTruthy();
    });
});
