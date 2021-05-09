import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JavaEditSnippetComponent} from './java-edit-snippet.component';
import {TestModule} from '../../../../../test/test.module';
import {MOCK_QUESTION} from '../../../../../test/mock';

describe('JavaEditSnippetComponent', () => {
    let component:    aEditSnippetComponent;
    let fixture: C    nentFixture<JavaEditSnippetComponent>;

    beforeEach(asy    ) => {
        await Test        igureTestingModule({
            import            le]
        }).compile        ts();
    });

    befor    h(()
        fixture =         createComponent(JavaEditSnippetComponent);
        component         e.componentInstance;
        component.        Details = MOCK_QUESTION;
        fixture.de        ges();
    });

    it('s    d cre    , () => {
        expect(com        toBeTruthy();
    });
});
