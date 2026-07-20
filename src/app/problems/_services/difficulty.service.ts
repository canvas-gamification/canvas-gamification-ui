import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {Difficulty} from '@app/_models/difficulty'
import {HttpClient} from '@angular/common/http'
import {ApiService} from "@app/_services/api.service"
import {catchError} from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class DifficultyService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    /**
     * Gets the difficulties from the API.
     */
    getDifficulties(): Observable<Difficulty[]> {
        const url = this.apiService.getURL('difficulty')
        return this.http.get<Difficulty[]>(url)
            .pipe(catchError(this.apiService.handleError<Difficulty[]>('Error occurred while fetching difficulties')))
    }
}
