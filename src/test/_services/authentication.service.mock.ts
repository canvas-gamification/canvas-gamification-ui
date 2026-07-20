import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable, of} from 'rxjs'
import {User} from '@app/_models'
import {ApiService} from "@app/_services/api.service"
import {MOCK_USER} from "@test/mock"

@Injectable({providedIn: 'root'})
export class AuthenticationServiceMock {
    public currentUser: Observable<User>
    private currentUserSubject: BehaviorSubject<User>

    constructor(private http: HttpClient, private apiService: ApiService) {
        this.currentUserSubject = new BehaviorSubject<User>(MOCK_USER)
        this.currentUser = this.currentUserSubject.asObservable()
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value
    }

    login(username: string, password: string): Observable<User> {
        return of(MOCK_USER)
    }

    logout(): void {
        this.currentUserSubject.next(null)
    }
}
