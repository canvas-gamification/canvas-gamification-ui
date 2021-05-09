import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JavaEditSnippetComponent} from './java-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_QUESTION} from '@test/mock';

describe('JavaEditSnippetComponent', () => {
    let component: JavaEditSnippetComponent;
    let fixture: ComponentFixture<JavaEditSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JavaEditSnippetComponent);
        component = fixture.componentInstance;
        component.QuestionDetails = MOCK_QUESTION;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
