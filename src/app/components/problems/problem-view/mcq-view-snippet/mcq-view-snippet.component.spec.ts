import {ComponentFixture, TestBed} from '@angular/core/testing';

import {McqViewSnippetComponent} from './mcq-view-snippet.component';
import {TestModule} from '../../../../../test/test.module';
import {MOCK_UQJ} from '../../../../../test/mock';

describe('McqViewSnippetComponent', () => {
    let component:    ViewSnippetComponent;
    let fixture: C    nentFixture<McqViewSnippetComponent>;

    beforeEach(asy    ) => {
        await Test        igureTestingModule({
            import            le]
        }).compile        ts();
    });

    befor    h(()
        fixture =         createComponent(McqViewSnippetComponent);
        component         e.componentInstance;
        component.        CK_UQJ;
        fixture.de        ges();
    });

    it('s    d cre    , () => {
        expect(com        toBeTruthy();
    });
});
