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
  private ProfileDetailsUrl = new URL('/api/update-profile/', environment.apiBaseUrl).toJSON();

  constructor(private http: HttpClient) {
  }

  PutProfileDetails(input: any, id: number) {
    return this.http.put(this.ProfileDetailsUrl + id + '/', input, {responseType: 'text'}).pipe(
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

  GetProfileDetails(): Observable<User>{
    return this.http.get<User>(this.ProfileDetailsUrl);
  }
}
