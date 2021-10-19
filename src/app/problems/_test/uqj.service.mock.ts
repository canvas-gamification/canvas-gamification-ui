import {Injectable} from "@angular/core";
import {UQJ} from "@app/_models";
import {MOCK_UQJS} from "@app/problems/_test/mock";
import {Observable, of} from "rxjs";
import {PaginatedResult} from "@app/_models/paginatedResult";

@Injectable({
    providedIn: 'root'
})
export class UqjServiceMock {
    getUQJs(): Observable<PaginatedResult<UQJ>> {
        return of({
            count: MOCK_UQJS.length,
            next: null,
            previous: null,
            results: MOCK_UQJS
        });
    }

    getUQJ(id: number): Observable<UQJ> {
        return of(MOCK_UQJS.find(uqj => uqj.id === id));
    }

    getUQJByQuestion(questionId: number): Observable<UQJ> {
        return of(MOCK_UQJS.find(uqj => uqj.question.id === questionId));
    }

    updateFavourite(data: {id: number, status: boolean}): Observable<UQJ>{
        const id = data.id;
        return of(MOCK_UQJS.find(uqj => uqj.id === id));
    }
}
