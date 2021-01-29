import { Injectable } from '@angular/core';
import {environment} from '@environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileDetailsService {
  private ProfileDetailsUrl = new URL('/api/update-profile', environment.apiBaseUrl).toJSON();

  constructor(private http: HttpClient) { }

  PutProfileDetails(input: any) {
    return this.http.put(this.ProfileDetailsUrl, input, {responseType: 'text'}).pipe(
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
