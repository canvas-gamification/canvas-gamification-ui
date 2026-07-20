import {Injectable} from '@angular/core'
import {FAQ} from '@app/_models/faq'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {catchError} from 'rxjs/operators'
import {ApiService} from "@app/_services/api.service"

@Injectable({
    providedIn: 'root'
})
export class FaqService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getFaqs(): Observable<FAQ[]> {
        const url = this.apiService.getURL('faq')
        return this.http
            .get<FAQ[]>(url)
            .pipe(catchError(this.apiService.handleError<FAQ[]>('Error occurred while fetching FAQ')))
    }
}

