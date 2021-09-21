import {TestBed} from '@angular/core/testing';

import {SubmissionService} from './submission.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {MOCK_QUESTIONS, MOCK_SUBMISSIONS} from "@app/problems/_test/mock";

describe('SubmissionService', () => {
    let submissionService: SubmissionService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
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
        submissionService.getSubmission(MOCK_SUBMISSIONS[1].pk).subscribe((submission) => {
            expect(submission).toEqual(MOCK_SUBMISSIONS[1]);
        });
        const request = httpMock.expectOne(apiService.getURL('submission', MOCK_SUBMISSIONS[1].pk));
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_SUBMISSIONS.find(submission => submission.pk === MOCK_SUBMISSIONS[1].pk));
    });

    it('getPreviousSubmissions returns submissions for a question', () => {
        submissionService.getPreviousSubmissions(MOCK_QUESTIONS[0].id).subscribe((submissions) => {
            expect(submissions.length).toEqual(MOCK_SUBMISSIONS.filter(submission => submission.question.id === MOCK_QUESTIONS[0].id).length);
            expect(submissions[0]).toEqual(MOCK_SUBMISSIONS[0]);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/submission/?question=0&ordering=%5Bobject%20Object%5D');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_SUBMISSIONS.filter(submission => submission.question.id === MOCK_QUESTIONS[0].id));
    });

    it('postQuestionSubmission makes request successfully', () => {
        submissionService.postQuestionSubmission({question: 0, solution: ''}).subscribe((response) => {
            expect(response.status).toEqual(200);
        });
        const request = httpMock.expectOne(apiService.getURL('submission', 'submit'));
        expect(request.request.method).toBe('POST');
        request.flush({status: 200});
    });
});
