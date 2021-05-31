import {Injectable} from '@angular/core';
import {Faq} from '@app/_models/faq';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root'
})
export class FaqService {
    private faqsUrl = new URL('/api/faq/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getFaqs(): Observable<Faq[]> {
        const url = this.apiService.getURL('faq');
        return this.http
            .get<Faq[]>(url)
            .pipe(catchError(this.apiService.handleError<Faq[]>('Error occurred while fetching FAQ')));
    }
}

