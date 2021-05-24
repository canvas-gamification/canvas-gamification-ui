import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SchemaService {
    private schemaUrl = new URL('/api/schema/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    getSchema(name: string): Observable<unknown> {
        return this.http.get(this.schemaUrl + name + '/');
    }
}
