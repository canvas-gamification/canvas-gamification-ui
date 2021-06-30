import {Injectable} from "@angular/core";
import {QuestionSubmission} from "@app/_models/question_submission";
import {MOCK_SUBMISSIONS} from "@app/problems/_tests/mock";
import {APIResponse} from "@app/_models";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SubmissionServiceMock {
    getSubmission(id: number): Observable<QuestionSubmission> {
        return of(MOCK_SUBMISSIONS.find(submission => submission.pk === id));
    }

    getPreviousSubmissions(id: number, options?: { ordering?: string }): Observable<QuestionSubmission[]> {
        return of(MOCK_SUBMISSIONS.filter(submission => submission.question.id === id));
    }

    postQuestionSubmission(input: { question: number, solution: string }): Observable<APIResponse> {
        return of({success: true});
    }
}
