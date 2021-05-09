import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsEditSnippetComponent} from './parsons-edit-snippet.component';
import {TestModule} from '../../../../../test/test.module';
import {MOCK_QUESTION} from '../../../../../test/mock';

describe('ParsonsEditSnippetComponent', () => {
    let component:    sonsEditSnippetComponent;
    let fixture: C    nentFixture<ParsonsEditSnippetComponent>;

    beforeEach(asy    ) => {
        await Test        igureTestingModule({
            import            le]
        }).compile        ts();
    });

    befor    h(()
        fixture =         createComponent(ParsonsEditSnippetComponent);
        component         e.componentInstance;
        component.        Details = MOCK_QUESTION;
        fixture.de        ges();
    });

    it('s    d cre    , () => {
        expect(com        toBeTruthy();
    });
});
