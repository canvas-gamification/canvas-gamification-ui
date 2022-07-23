import {Injectable} from "@angular/core"
import {McqFormData} from "@app/problems/_forms/mcq.form"
import {Observable, of} from "rxjs"
import {Question} from "@app/_models"
import {JavaFormData} from "@app/problems/_forms/java.form"
import {ParsonsFormData} from "@app/problems/_forms/parsons.form"
import {MOCK_JAVA_QUESTION, MOCK_MCQ_QUESTION, MOCK_PARSONS_QUESTION, MOCK_QUESTIONS} from "@app/problems/_test/mock"
import {ProblemSetFormData} from "@app/problems/_forms/problem-set.form"
import {PaginatedResult} from "@app/_models/paginatedResult"
import {HttpResponse} from "@angular/common/http"

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
        }
        return of(questions)
    }

    getQuestion(id: number): Observable<Question> {
        return of(MOCK_QUESTIONS.find(question => question.id === id))
    }

    getQuestionType(question: Question): string {
        return question.type_name
    }

    postMultipleChoiceQuestion(input: McqFormData): Observable<HttpResponse<Question>> {
        return of(new HttpResponse({body: MOCK_MCQ_QUESTION, status: 201}))
    }

    postJavaQuestion(input: JavaFormData): Observable<HttpResponse<Question>> {
        return of(new HttpResponse({body: MOCK_JAVA_QUESTION, status: 201}))
    }

    postParsonsQuestion(input: ParsonsFormData): Observable<HttpResponse<Question>> {
        return of(new HttpResponse({body: MOCK_PARSONS_QUESTION, status: 201}))
    }

    putMultipleChoiceQuestion(input: McqFormData, id: number): Observable<HttpResponse<Question>> {
        return of(new HttpResponse({body: MOCK_MCQ_QUESTION, status: 200}))
    }

    putJavaQuestion(input: JavaFormData, id: number): Observable<HttpResponse<Question>> {
        return of(new HttpResponse({body: MOCK_JAVA_QUESTION, status: 200}))
    }

    putParsonsQuestion(input: ParsonsFormData, id: number): Observable<HttpResponse<Question>> {
        return of(new HttpResponse({body: MOCK_PARSONS_QUESTION, status: 200}))
    }

    deleteQuestion(id: number): Observable<HttpResponse<Question>> {
        return of(new HttpResponse({body: MOCK_MCQ_QUESTION, status: 200}))
    }
}
