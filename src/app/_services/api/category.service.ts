import {Injectable} from '@angular/core';
import {Category} from '@app/_models';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root',
})
export class CategoryService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getCategories(): Observable<Category[]> {
        const url = this.apiService.getURL('question-category');
        return this.http
            .get<Category[]>(url)
            .pipe(catchError(this.apiService.handleError<Category[]>('Error occurred while fetching categories')));
    }

    getCategory(categoryId: number): Observable<Category> {
        const url = this.apiService.getURL('question-category', categoryId);
        return this.http
            .get<Category>(url)
            .pipe(catchError(this.apiService.handleError<Category>('Error occurred while fetching category')));
    }
}
