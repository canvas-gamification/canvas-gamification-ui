import {Injectable} from "@angular/core";
import {UQJ} from "@app/_models";
import {MOCK_UQJS} from "@app/problems/_tests/mock";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UqjServiceMock {
    getUQJs(): Observable<UQJ[]> {
        return of(MOCK_UQJS);
    }

    getUQJ(id: number): Observable<UQJ> {
        return of(MOCK_UQJS.find(uqj => uqj.id === id));
    }

    getUQJByQuestion(questionId: number): Observable<UQJ> {
        return of(MOCK_UQJS.find(uqj => uqj.question.id === questionId));
    }
}
