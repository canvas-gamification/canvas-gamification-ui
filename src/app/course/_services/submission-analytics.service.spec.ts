import { TestBed } from '@angular/core/testing';

import { SubmissionAnalyticsService } from './submission-analytics.service';
import {HttpTestingController} from "@angular/common/http/testing";
import {
    MOCK_SUBMISSION_ANALYTICS,
    MOCK_SUBMISSION_ANALYTICS_2,
    MOCK_SUBMISSION_ANALYTICS_3
} from "@app/problems/_test/mock";

describe('SubmissionAnalyticsService', () => {
    let submissionAnalyticsService: SubmissionAnalyticsService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        submissionAnalyticsService = TestBed.inject(SubmissionAnalyticsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(submissionAnalyticsService).toBeTruthy();
    });

    it('should return a mcq submission analytics', () =>{
        submissionAnalyticsService.getMCQSubmissionAnalyticsByQuestion(0).subscribe(submissionAnalytics =>{
            expect(submissionAnalytics[0]).toBe(MOCK_SUBMISSION_ANALYTICS);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/mcq-submission-analytics/?question=0');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_SUBMISSION_ANALYTICS);
    });

    it('should return a java submission analytics', () =>{
        submissionAnalyticsService.getJavaSubmissionAnalyticsByQuestion(1).subscribe(submissionAnalytics =>{
            expect(submissionAnalytics[0]).toBe(MOCK_SUBMISSION_ANALYTICS_2);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/java-submission-analytics/?question=1');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_SUBMISSION_ANALYTICS_2);
    });

    it('should return a parsons submission analytics', () =>{
        submissionAnalyticsService.getParsonsSubmissionAnalyticsByQuestion(2).subscribe(submissionAnalytics =>{
            expect(submissionAnalytics[0]).toBe(MOCK_SUBMISSION_ANALYTICS_3);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/parsons-submission-analytics/?question=2');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_SUBMISSION_ANALYTICS_3);
    });

});
