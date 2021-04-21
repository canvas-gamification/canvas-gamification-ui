import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {Observable} from 'rxjs';
import {Difficulty} from '@app/_models/difficulty';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DifficultyService {
    private difficultyUrl = new URL('api/difficulty/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    getDifficulties(): Observable<Difficulty[]> {
        return this.http.get<Difficulty[]>(this.difficultyUrl);
    }
}
