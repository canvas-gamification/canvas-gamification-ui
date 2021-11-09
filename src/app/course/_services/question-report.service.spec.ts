import {TestBed} from '@angular/core/testing';

import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {QuestionReportService} from "@app/course/_services/question-report.service";
import {
    MOCK_USER_STUDENT, MOCK_MCQ_QUESTION, MOCK_QUESTION_REPORT
} from "@app/course/_test/mock";

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

    it('sendReport should create a report', () => {
        const data: { user: number, question: number, report: string, report_details: string } = {
            user: MOCK_USER_STUDENT.id,
            question: MOCK_MCQ_QUESTION.id,
            report: MOCK_QUESTION_REPORT.report,
            report_details: MOCK_QUESTION_REPORT.report_details
        };
        questionReportService.sendReport(data).subscribe(response => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('question-report'));
        expect(request.request.method).toBe('POST');
        request.flush({"success": true});
    });

    it('updateReport should update a report', () => {
        const data: {report: string, report_details: string } = {
            report: MOCK_QUESTION_REPORT.report,
            report_details: MOCK_QUESTION_REPORT.report_details
        };
        questionReportService.updateReport(data,MOCK_QUESTION_REPORT.id).subscribe(response => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('question-report',MOCK_QUESTION_REPORT.id));
        expect(request.request.method).toBe('PUT');
        request.flush({"success": true});
    });

    it('getReport should retrieve a report', () => {
        questionReportService.getReport(MOCK_QUESTION_REPORT.id).subscribe(response => {
            expect(response).toEqual(MOCK_QUESTION_REPORT);
        });
        const request = httpMock.expectOne(apiService.getURL('question-report',MOCK_QUESTION_REPORT.id));
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_QUESTION_REPORT);
    });

    it('deleteReport should delete the report', () => {
        questionReportService.deleteReport(MOCK_QUESTION_REPORT.id).subscribe(response => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('question-report',MOCK_QUESTION_REPORT.id));
        expect(request.request.method).toBe('DELETE');
        request.flush({"success": true});
    });
});
