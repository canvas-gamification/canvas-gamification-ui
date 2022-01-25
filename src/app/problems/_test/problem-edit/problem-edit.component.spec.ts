import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProblemEditComponent} from '../../problem-edit/problem-edit.component';
import {TestModule} from '@test/test.module';
import {QuestionServiceMock} from "@app/problems/_test/_services/question.service.mock";
import {QuestionService} from "@app/problems/_services/question.service";
import {ActivatedRoute} from "@angular/router";
import {MOCK_QUESTIONS} from "@app/problems/_test/mock";
import {McqEditSnippetComponent} from "@app/problems/problem-edit/mcq-edit-snippet/mcq-edit-snippet.component";
import {JavaEditSnippetComponent} from "@app/problems/problem-edit/java-edit-snippet/java-edit-snippet.component";
import {ParsonsEditSnippetComponent} from "@app/problems/problem-edit/parsons-edit-snippet/parsons-edit-snippet.component";
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ReactiveFormsModule} from "@angular/forms";

describe('ProblemEditComponent', () => {
    let component: ProblemEditComponent;
    let fixture: ComponentFixture<ProblemEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, CKEditorModule, ReactiveFormsModule],
            declarations: [ProblemEditComponent,
                McqEditSnippetComponent,
                JavaEditSnippetComponent,
                ParsonsEditSnippetComponent,
                CkEditorComponent],
            providers: [
                {provide: QuestionService, useClass: QuestionServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            params: {
                                id: 0
                            }
                        }
                    }
                }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProblemEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set questionDetails', () => {
        expect(component.questionDetails).toEqual(MOCK_QUESTIONS[0]);
    });
});
