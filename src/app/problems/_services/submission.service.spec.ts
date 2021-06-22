import {TestBed} from '@angular/core/testing';

import {SubmissionService} from './submission.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {QuestionSubmission} from "@app/_models/question_submission";
import {MOCK_QUESTION_SUBMISSION, MOCK_QUESTION_SUBMISSION_2} from "@test/mock";

describe('SubmissionService', () => {
    let mockSubmissions: QuestionSubmission[];
    let submissionService: SubmissionService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        mockSubmissions = [MOCK_QUESTION_SUBMISSION, MOCK_QUESTION_SUBMISSION_2];
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [SubmissionService, ApiService]
        });
        submissionService = TestBed.inject(SubmissionService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(submissionService).toBeTruthy();
    });

    it('getSubmission returns a submission', () => {
        submissionService.getSubmission(1).subscribe((submission) => {
            expect(submission.pk).toEqual(1);
            expect(submission.is_correct).toBeFalsy();
        });
        const request = httpMock.expectOne(apiService.getURL('submission', 1));
        expect(request.request.method).toBe('GET');
        request.flush(mockSubmissions.find(submission => submission.pk === 1));
    });

    it('getPreviousSubmissions returns submissions for a question', () => {
        submissionService.getPreviousSubmissions(0).subscribe((submission) => {
            expect(submission.length).toEqual(1);
            expect(submission[0]).toBe(mockSubmissions[0]);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/submission/?question=0&ordering=%5Bobject%20Object%5D');
        expect(request.request.method).toBe('GET');
        request.flush(mockSubmissions.filter(submission => submission.question.id === 0));
    });

    it('postQuestionSubmission makes request successfully', () => {
        submissionService.postQuestionSubmission({question: 0, solution: ''}).subscribe((response) => {
            expect(response.success).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('submission', 'submit'));
        expect(request.request.method).toBe('POST');
        request.flush({success: true});
    });
});
