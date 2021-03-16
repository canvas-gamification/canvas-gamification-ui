import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserConsent} from '@app/_models/user_consent';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {
  private consentAPIUrl = new URL('/api/user-consent/', environment.apiBaseUrl).toString();

  constructor(private http: HttpClient) {
  }

  PostConsent(input: any) {
    return this.http.post(this.consentAPIUrl, input, {responseType: 'text'}).pipe(
      map((response) => {
          if (response) {
            return response;
          }
        },
        (error: any) => {
          return error;
        }
      )
    );
  }

  WithdrawConsent(input: any) {
    return this.http.post(this.consentAPIUrl, input, {responseType: 'text'}).pipe(
      map((response) => {
          if (response) {
            return response;
          }
        },
        (error: any) => {
          return error;
        }
      )
    );
  }

  GetConsent(): Observable<UserConsent[]> {
    return this.http.get<UserConsent[]>(this.consentAPIUrl);
  }
}
