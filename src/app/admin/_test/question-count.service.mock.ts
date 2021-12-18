import {Observable, of} from "rxjs";
import {QuestionCount} from "@app/_models";
import {MOCK_QUESTION_COUNT} from "@app/admin/_test/mock";

export class QuestionCountServiceMock {
    getQuestionCount(): Observable<QuestionCount[]> {
        return of([MOCK_QUESTION_COUNT]);
    }
}
