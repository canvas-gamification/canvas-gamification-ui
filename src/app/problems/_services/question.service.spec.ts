import {TestBed} from '@angular/core/testing';

import {QuestionService} from './question.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {Question} from "@app/_models";
import {MOCK_CHECKBOX_QUESTION, MOCK_MCQ_QUESTION} from "@test/mock";
import {McqFormData} from "@app/problems/_forms/mcq.form";

describe('QuestionService', () => {
    let mockQuestions: Question[];
    let questionService: QuestionService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        mockQuestions = [MOCK_MCQ_QUESTION, MOCK_CHECKBOX_QUESTION];
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
            expect(questions.results.length).toEqual(2);
            expect(questions.results).toEqual(mockQuestions);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/questions/?page=1&page_size=50&search=&category__parent__name=&category__name=&difficulty=&is_sample=&ordering=');
        expect(request.request.method).toBe('GET');
        request.flush(mockQuestions);
    });

    it('getQuestion returns a single question', () => {
        questionService.getQuestion(0).subscribe((question) => {
            expect(question.id).toEqual(0);
            expect(question.is_checkbox).toBeFalsy();
        });
        const request = httpMock.expectOne(apiService.getURL('questions', 0));
        expect(request.request.method).toBe('GET');
        request.flush(mockQuestions[0]);
    });

    it('getQuestionType returns the question type', () => {
        expect(questionService.getQuestionType(mockQuestions[0])).toEqual('multiple choice question');
    });

    it('deleteQuestion deletes a question', () => {
        questionService.deleteQuestion(0).subscribe(() => {
            expect(mockQuestions.length).toEqual(1);
            expect(mockQuestions[0].id).toEqual(1);
        });
        const request = httpMock.expectOne(apiService.getURL('questions', 0));
        expect(request.request.method).toBe('DELETE');
        request.flush(mockQuestions.splice(0, 1));
    });

    it('putMultipleChoiceQuestion', () => {
        const mockMcqFormData: McqFormData = {
            title: 'This is a test.',
            difficulty: 'EASY',
            course: null,
            event: null,
            text: null,
            answer: mockQuestions[0].answer,
            category: null,
            variables: null,
            visible_distractor_count: mockQuestions[0].visible_distractor_count,
            choices: null
        };
        questionService.putMultipleChoiceQuestion(mockMcqFormData, 0).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(mockQuestions[0].title).toEqual('This is a test.');
            expect(mockQuestions[0].difficulty).toEqual('EASY');
        });
        const request = httpMock.expectOne(apiService.getURL('multiple-choice-question', 0));
        expect(request.request.method).toBe('PUT');
        mockQuestions[0].title = mockMcqFormData.title;
        mockQuestions[0].difficulty = mockMcqFormData.difficulty;
        request.flush(mockQuestions[0]);
    });
});
