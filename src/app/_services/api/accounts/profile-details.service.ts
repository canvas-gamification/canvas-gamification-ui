import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '@app/_models';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileDetailsService {
  private profileDetailsUrl = new URL('/api/update-profile/', environment.apiBaseUrl).toJSON();

  constructor(private http: HttpClient) {
  }

  putProfileDetails(input: unknown, id: number) : Observable<string>{
      return this.http.put(this.profileDetailsUrl + id + '/', input, {responseType: 'text'}).pipe(
          map(
              (response) => {
                  if (response) {
                      return response;
                  }
              },
              (error: never) => {
                  return error;
              }
          )
      );
  }

  getProfileDetails(): Observable<User>{
      return this.http.get<User>(this.profileDetailsUrl);
  }
}
