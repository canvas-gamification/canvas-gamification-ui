import {TestBed} from '@angular/core/testing';

import {QuestionService} from './question.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {
    MOCK_JAVA_FORM_DATA,
    MOCK_MCQ_FORM_DATA,
    MOCK_PARSONS_FORM_DATA,
    MOCK_QUESTIONS
} from "@app/problems/_test/mock";

describe('QuestionService', () => {
    let questionService: QuestionService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [QuestionService, ApiService]
        });
        questionService = TestBed.inject(QuestionService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(questionService).toBeTruthy();
    });

    it('getQuestions returns all questions', () => {
        questionService.getQuestions().subscribe((questions) => {
            expect(questions.results.length).toEqual(MOCK_QUESTIONS.length);
            expect(questions.results).toEqual(MOCK_QUESTIONS);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/questions/?page=1&page_size=50&search=&category__parent__name=&category__name=&difficulty=&is_sample=&ordering=');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_QUESTIONS);
    });

    it('getQuestion returns a single question', () => {
        questionService.getQuestion(MOCK_QUESTIONS[0].id).subscribe((question) => {
            expect(question).toEqual(MOCK_QUESTIONS[0]);
        });
        const request = httpMock.expectOne(apiService.getURL('questions', MOCK_QUESTIONS[0].id));
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_QUESTIONS[0]);
    });

    it('getQuestionType returns the question type', () => {
        expect(questionService.getQuestionType(MOCK_QUESTIONS[0])).toEqual('multiple choice question');
    });

    it('deleteQuestion deletes a question', () => {
        questionService.deleteQuestion(0).subscribe((response) => {
            expect(response).toEqual('Question Deleted');
        });
        const request = httpMock.expectOne(apiService.getURL('questions', 0));
        expect(request.request.method).toBe('DELETE');
        request.flush('Question Deleted');
    });

    it('putMultipleChoiceQuestion', () => {
        questionService.putMultipleChoiceQuestion(MOCK_MCQ_FORM_DATA, 0).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('multiple-choice-question', 0));
        expect(request.request.method).toBe('PUT');
        request.flush({success: true});
    });

    it('putJavaQuestion', () => {
        questionService.putJavaQuestion(MOCK_JAVA_FORM_DATA, 0).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('java-question', 0));
        expect(request.request.method).toBe('PUT');
        request.flush({success: true});
    });

    it('putParsonsQuestion', () => {
        questionService.putParsonsQuestion(MOCK_PARSONS_FORM_DATA, 0).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('parsons-question', 0));
        expect(request.request.method).toBe('PUT');
        request.flush({success: true});
    });

    it('postMultipleChoiceQuestion', () => {
        questionService.postMultipleChoiceQuestion(MOCK_MCQ_FORM_DATA).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('multiple-choice-question'));
        expect(request.request.method).toBe('POST');
        request.flush({success: true});
    });

    it('postJavaQuestion', () => {
        questionService.postJavaQuestion(MOCK_JAVA_FORM_DATA).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('java-question'));
        expect(request.request.method).toBe('POST');
        request.flush({success: true});
    });

    it('postParsonsQuestion', () => {
        questionService.postParsonsQuestion(MOCK_PARSONS_FORM_DATA).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('parsons-question'));
        expect(request.request.method).toBe('POST');
        request.flush({success: true});
    });
});
