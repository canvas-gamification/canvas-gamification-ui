import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '@environments/environment';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
  private contactUsAPIUrl = new URL('/api/contact-us/', environment.apiBaseUrl).toString();

  constructor(private http: HttpClient) { }

  postMessage(input: { fullname: string, email: string, comment: string, recaptcha_key: string }) : Observable<string>{
      return this.http.post(this.contactUsAPIUrl, input, {responseType: 'text'}).pipe(
          map(
              (response) => {
                  if (response) {
                      return response;
                  }
              },
              (error: unknown) => {
                  return error;
              }
          )
      );
  }
}
