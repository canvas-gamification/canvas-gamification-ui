import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {catchError} from 'rxjs/operators'
import {User} from '@app/_models'
import {Observable} from 'rxjs'
import {ApiService} from "@app/_services/api.service"
import {ProfileDetailsFormData} from "@app/accounts/_forms/profile-details.form"

@Injectable({
    providedIn: 'root'
})
export class ProfileDetailsService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    putProfileDetails(input: ProfileDetailsFormData, id: number): Observable<User> {
        const url = this.apiService.getURL('update-profile', id)
        return this.http
            .put<User>(url, input)
            .pipe(catchError(this.apiService.handleFormError()))
    }

    getProfileDetails(id: number): Observable<User> {
        const url = this.apiService.getURL('update-profile', id)
        return this.http.get<User>(url)
            .pipe(catchError(this.apiService.handleError<User>(
                `There was a problem retrieving your profile details`,
                null,
                {
                    redirect: ['accounts', 'login'],
                    redirect404: true,
                    redirect403: true,
                    showMessage: true,
                })))
    }
}
