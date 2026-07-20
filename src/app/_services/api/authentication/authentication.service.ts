import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import {User} from '@app/_models'
import {ApiService} from "@app/_services/api.service"

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    public currentUser: Observable<User>
    private currentUserSubject: BehaviorSubject<User>

    constructor(private http: HttpClient, private apiService: ApiService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
        this.currentUser = this.currentUserSubject.asObservable()
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value
    }

    login(username: string, password: string): Observable<User> {
        const url = this.apiService.getURL('api-token-auth')
        return this.http.post<User>(url, {username, password})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user))
                this.currentUserSubject.next(user)
                return user
            }))
            .pipe(catchError(this.apiService.handleFormError()))
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser')
        this.currentUserSubject.next(null)
    }
}
