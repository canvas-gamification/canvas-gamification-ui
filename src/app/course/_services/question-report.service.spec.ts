import {TestBed} from '@angular/core/testing';

import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {QuestionReportService} from "@app/course/_services/question-report.service";
import {
    MOCK_USER_STUDENT, MOCK_MCQ_QUESTION, MOCK_QUESTION_REPORT, MOCK_QUESTION_REPORT2
} from "@app/course/_test/mock";
import {Question, User} from "@app/_models";

describe('QuestionReportService', () => {
    let questionReportService: QuestionReportService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [QuestionReportService, ApiService]
        });
        questionReportService = TestBed.inject(QuestionReportService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(questionReportService).toBeTruthy();
    });

    it('sentReport should create a report', () => {
        const data: { user: User, question: Question, report: string, report_details: string } = {
            user: MOCK_USER_STUDENT,
            question: MOCK_MCQ_QUESTION,
            report: MOCK_QUESTION_REPORT.report,
            report_details: MOCK_QUESTION_REPORT.report_details
        };
        questionReportService.sendReport(data).subscribe(response => {
            expect(response).toBeTruthy();
        })
        const request = httpMock.expectOne(apiService.getURL('question-report', 'add-report'));
        expect(request.request.method).toBe('POST');
        request.flush({"success": true});
    });

    it('getReport should retrieve a report', () => {
        questionReportService.getReport(1, 1).subscribe(response => {
            expect(response).toEqual(MOCK_QUESTION_REPORT);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/question-report/get-report/?question=1&user=1');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_QUESTION_REPORT);
    });

    it('deleteReport should delete the report', () => {
        questionReportService.deleteReport(1, 1).subscribe(response => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne('http://localhost:8000/api/question-report/delete-report/?question=1&user=1');
        expect(request.request.method).toBe('DELETE');
        request.flush({"success": true});
    });
});
