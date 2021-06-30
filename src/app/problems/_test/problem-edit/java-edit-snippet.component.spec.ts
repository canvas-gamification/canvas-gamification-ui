import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JavaEditSnippetComponent} from '../../problem-edit/java-edit-snippet/java-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_MCQ_QUESTION} from '@app/problems/_test/mock';

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
        component.questionDetails = MOCK_MCQ_QUESTION;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
