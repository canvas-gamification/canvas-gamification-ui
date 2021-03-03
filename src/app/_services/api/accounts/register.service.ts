import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private RegistrationUrl = new URL('/api/register/', environment.apiBaseUrl).toJSON();

  constructor(private http: HttpClient) {
  }

  PostRegistration(input: any) {
    return this.http.post(this.RegistrationUrl, input, {responseType: 'text'}).pipe(
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
