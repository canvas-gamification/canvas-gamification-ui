import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private ResetPasswordUrl = new URL('/api/reset-password/', environment.apiBaseUrl).toString();

  constructor(private http: HttpClient) { }

  PutPasswordReset(input: any) {
    return this.http.put(this.ResetPasswordUrl, input, {responseType: 'text'}).pipe(
      map(
        (response) => {
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
