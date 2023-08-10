import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {ApiService} from "@app/_services/api.service"
import {Observable} from "rxjs"
import {EventSet} from "@app/_models/event-set"
import {catchError} from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class EventSetService {

    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) {
    }

    addEventSet(eventSetData: EventSetFormData): Observable<EventSet> {
        const url = this.apiService.getURL('event-set')
        return this.http
            .post<EventSet>(url, eventSetData)
            .pipe(catchError(
                this.apiService.handleError<EventSet>('Error occurred while adding event set.')
            ))
    }

    deleteEventSet(eventSetId: number): Observable<EventSet> {
        const url = this.apiService.getURL('event-set', eventSetId)
        return this.http
            .delete<EventSet>(url)
            .pipe(catchError(
                this.apiService.handleError<EventSet>('Error occurred while deleting event set.')
            ))

    }

    // Decision Question: Who can edit the consistency challenge?
    // updateEventSet():Observable<any> {
    //
    // }

}
