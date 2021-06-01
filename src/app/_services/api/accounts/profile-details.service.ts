import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {User} from '@app/_models';
import {Observable} from 'rxjs';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileDetailsService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    putProfileDetails(input: {
        first_name: string,
        last_name: string,
        email: string
    }, id: number): Observable<User> {
        const url = this.apiService.getURL('update-profile', id);
        return this.http
            .put<User>(url, input)
            .pipe(catchError(this.apiService.handleError<User>(`There was a problem updating your profile details`)));
    }

    getProfileDetails(): Observable<User> {
        const url = this.apiService.getURL('update-profile');
        return this.http.get<User>(url)
            .pipe(catchError(this.apiService.handleError<User>(`There was a problem retrieving your profile details`)));
    }
}
