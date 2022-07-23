import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {catchError} from 'rxjs/operators'
import {Observable} from "rxjs"
import {ApiService} from "@app/_services/api.service"

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    postMessage(input: { fullname: string, email: string, comment: string, recaptcha_key: string }): Observable<string> {
        const url = this.apiService.getURL('contact-us')
        return this.http.post<string>(url, input)
            .pipe(catchError(this.apiService.handleError<string>('Error occurred while sending message')))
    }
}
