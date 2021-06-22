import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService} from "@app/_services/api.service";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: null
})
export class SchemaService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    /**
     * Gets the schema for the json-editor from the server.
     * @param name - The name of the schema to retrieve.
     */
    // TODO - Determine a more specific type.
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    getSchema(name: string): Observable<any> {
        const url = this.apiService.getURL('schema', name);
        return this.http.get(url)
            .pipe(catchError(this.apiService.handleError()));
    }
}
