import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {ApiService} from "@app/_services/api.service"
import {catchError} from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class PageViewService {
    constructor(private http: HttpClient, private apiService: ApiService) { }

    pageView(input: {
        url: string
    }) {
        const url = this.apiService.getURL('page-view')
        return this.http.post(url, input).pipe(catchError(this.apiService.handleError<unknown>('Error happened in page view')))
    }
}
