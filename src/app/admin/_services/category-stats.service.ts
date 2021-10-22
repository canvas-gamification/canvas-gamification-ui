import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";
import {NestedCategories} from "@app/_models";
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryStatsService {

    constructor(private http: HttpClient,
                private apiService: ApiService) {
    }

    getCategoryStats(): Observable<NestedCategories[]> {
        const url = this.apiService.getURL('category-stats');
        return this.http
            .get<NestedCategories[]>(url)
            .pipe(catchError(this.apiService.handleError<NestedCategories[]>('Unable to get category stats', [])));
    }
}
