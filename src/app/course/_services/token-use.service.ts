import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaderResponse, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import {catchError} from 'rxjs/operators'
import {ApiService} from "@app/_services/api.service"

@Injectable({
    providedIn: 'root'
})
export class TokenUseService {
    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    useTokens(tokenActions: unknown, courseId: number): Observable<HttpHeaderResponse> {
        //TODO: Need to see if there is a way to avoid suppress here
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({'Content-Type': 'application/json'})
        const url = this.apiService.getURL('token-use', 'use', courseId)
        return this.http.post<HttpHeaderResponse>(url, tokenActions, {headers,})
            .pipe(catchError(this.apiService.handleError<HttpHeaderResponse>(`Error occurred while attempting to use tokens`)))
    }
}
