import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsViewSnippetComponent} from './parsons-view-snippet.component';
import {TestModule} from '../../../../../test/test.module';
import {MOCK_UQJ} from '../../../../../test/mock';

describe('ParsonsViewSnippetComponent', () => {
    let component:    sonsViewSnippetComponent;
    let fixture: C    nentFixture<ParsonsViewSnippetComponent>;

    beforeEach(asy    ) => {
        await Test        igureTestingModule({
            import            le]
        }).compile        ts();
    });

    befor    h(()
        fixture =         createComponent(ParsonsViewSnippetComponent);
        component         e.componentInstance;
        component.        CK_UQJ;
        fixture.de        ges();
    });

    it('s    d cre    , () => {
        expect(com        toBeTruthy();
    });
});
