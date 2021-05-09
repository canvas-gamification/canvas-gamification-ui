import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsEditSnippetComponent} from './parsons-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_QUESTION} from '@test/mock';

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
        component.QuestionDetails = MOCK_QUESTION;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
