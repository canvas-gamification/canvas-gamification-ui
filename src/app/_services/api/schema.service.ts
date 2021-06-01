import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService} from "@app/_services/api.service";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class SchemaService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getSchema(name: string): Observable<unknown> {
        const url = this.apiService.getURL('schema', name);
        return this.http.get(url)
            .pipe(catchError(this.apiService.handleError()));
    }
}
