import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Difficulty} from "@app/_models/difficulty";
import {MOCK_DIFFICULTIES} from "@app/problems/_test/mock";

@Injectable({
    providedIn: 'root'
})
export class DifficultyServiceMock {
    getDifficulties(): Observable<Difficulty[]> {
        return of(MOCK_DIFFICULTIES);
    }
}
