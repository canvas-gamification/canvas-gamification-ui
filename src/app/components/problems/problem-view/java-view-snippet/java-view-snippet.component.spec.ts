import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JavaViewSnippetComponent} from './java-view-snippet.component';
import {TestModule} from '../../../../../test/test.module';
import {MOCK_UQJ} from '../../../../../test/mock';

describe('JavaViewSnippetComponent', () => {
    let component:    aViewSnippetComponent;
    let fixture: C    nentFixture<JavaViewSnippetComponent>;

    beforeEach(asy    ) => {
        await Test        igureTestingModule({
            import            le]
        }).compile        ts();
    });

    befor    h(()
        fixture =         createComponent(JavaViewSnippetComponent);
        component         e.componentInstance;
        component.        CK_UQJ;
        fixture.de        ges();
    });

    it('s    d cre    , () => {
        expect(com        toBeTruthy();
    });
});
