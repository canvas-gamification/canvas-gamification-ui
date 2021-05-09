import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TermsAndConditionsSnippetComponent} from './terms-and-conditions-snippet.component';
import {TestModule} from '../../../../test/test.module';

describe('TermsAndConditionsSnippetComponent', () => {
    let component: TermsAndConditionsSnippetComponent;
    let fixture: ComponentFixture<TermsAndConditionsSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TermsAndConditionsSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
