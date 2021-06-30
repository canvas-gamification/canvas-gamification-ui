import {ComponentFixture, TestBed} from '@angular/core/testing';

import {McqViewSnippetComponent} from '../../problem-view/mcq-view-snippet/mcq-view-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_UQJ, MOCK_UQJ_2} from '@app/problems/_tests/mock';
import {SubmissionService} from "@app/problems/_services/submission.service";
import {SubmissionServiceMock} from "@app/problems/_tests/submission.service.mock";

let component: McqViewSnippetComponent;
let fixture: ComponentFixture<McqViewSnippetComponent>;

beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [TestModule],
        providers: [{provide: SubmissionService, useClass: SubmissionServiceMock}],
        declarations: [McqViewSnippetComponent]
    }).compileComponents();
});

describe('McqViewSnippetComponent - MCQ', () => {
    let component: McqViewSnippetComponent;
    let fixture: ComponentFixture<McqViewSnippetComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(McqViewSnippetComponent);
        component = fixture.componentInstance;
        component.uqj = MOCK_UQJ;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('choiceArray should be set', () => {
        expect(component.choiceArray.length).toEqual(2);
    });
});

describe('McqViewSnippetComponent - Checkbox', () => {
    beforeEach(() => {
        fixture = TestBed.createComponent(McqViewSnippetComponent);
        component = fixture.componentInstance;
        component.uqj = MOCK_UQJ_2;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('onClicking a checkbox.', () => {
        expect(component.checkboxAnswers.length).toEqual(0);
        fixture.debugElement.nativeElement.querySelector('#a').click();
        fixture.detectChanges();
        expect(component.checkboxAnswers.length).toEqual(1);

        // Uncheck
        fixture.debugElement.nativeElement.querySelector('#a').click();
        fixture.detectChanges();
        expect(component.checkboxAnswers.length).toEqual(0);
    });
});
