import {Injectable} from '@angular/core';
import {environment} from '@environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {
  private consentAPIUrl = new URL('/api/user-consent', environment.apiBaseUrl).toString();

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
}
