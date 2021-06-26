import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsViewSnippetComponent} from '../../problem-view/parsons-view-snippet/parsons-view-snippet.component';
import {TestModule} from '@test/test.module';
import {DragulaModule} from "ng2-dragula";
import {MOCK_UQJ_4} from "@app/problems/_tests/mock";
import {SubmissionService} from "@app/problems/_services/submission.service";
import {SubmissionServiceMock} from "@app/problems/_tests/submission.service.mock";

describe('ParsonsViewSnippetComponent', () => {
    let component: ParsonsViewSnippetComponent;
    let fixture: ComponentFixture<ParsonsViewSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ParsonsViewSnippetComponent],
            imports: [TestModule, DragulaModule.forRoot()],
            providers: [{provide: SubmissionService, useClass: SubmissionServiceMock}],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ParsonsViewSnippetComponent);
        component = fixture.componentInstance;
        component.uqj = MOCK_UQJ_4;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('parsonsLines should be set', () => {
        expect(component.parsonLines.length).toEqual(MOCK_UQJ_4.rendered_lines.length);
    });

    it('determineIndents and calculate sourceCode', () => {
        component.parsonAnswerLines = component.parsonLines;
        component.determineIndents();
        component.calculateSourceCode();
        expect(component.code).toEqual('{\n' +
            '    print()\n' +
            '}\n');
    });
});
