import {Injectable} from "@angular/core";
import {McqFormData} from "@app/problems/_forms/mcq.form";
import {Observable, of} from "rxjs";
import {APIResponse, Question} from "@app/_models";
import {JavaFormData} from "@app/problems/_forms/java.form";
import {ParsonsFormData} from "@app/problems/_forms/parsons.form";
import {MOCK_QUESTIONS} from "@app/problems/_test/mock";
import {ProblemSetFormData} from "@app/problems/_forms/problem-set.form";
import {PaginatedResult} from "@app/_models/paginatedResult";

@Injectable({
    providedIn: 'root'
})
export class QuestionServiceMock {
    getQuestions(options?: ProblemSetFormData): Observable<PaginatedResult<Question>> {
        const questions: PaginatedResult<Question> = {
            count: 4,
            next: '',
            previous: '',
            results: MOCK_QUESTIONS
        };
        return of(questions);
    }

    getQuestion(id: number): Observable<Question> {
        return of(MOCK_QUESTIONS.find(question => question.id === id));
    }

    getQuestionType(question: Question): string {
        return question.type_name;
    }

    postMultipleChoiceQuestion(input: McqFormData): Observable<APIResponse> {
        return of({success: true});
    }

    postJavaQuestion(input: JavaFormData): Observable<APIResponse> {
        return of({success: true});
    }

    postParsonsQuestion(input: ParsonsFormData): Observable<APIResponse> {
        return of({success: true});
    }

    putMultipleChoiceQuestion(input: McqFormData, id: number): Observable<APIResponse> {
        return of({success: true});
    }

    putJavaQuestion(input: JavaFormData, id: number): Observable<APIResponse> {
        return of({success: true});
    }

    putParsonsQuestion(input: ParsonsFormData, id: number): Observable<APIResponse> {
        return of({success: true});
    }

    deleteQuestion(id: number): Observable<APIResponse> {
        return of({success: true});
    }
}
