import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SchemaService {
    private schemaUrl = new URL('/api/schema/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    getSchema(name): Observable<any> {
        return this.http.get(this.schemaUrl + name + '/');
    }
}
