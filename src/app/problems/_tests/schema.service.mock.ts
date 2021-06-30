import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {MOCK_SCHEMAS} from "@app/problems/_tests/mock";

@Injectable({
    providedIn: 'root'
})
export class SchemaServiceMock {
    getSchema(name: string): Observable<unknown> {
        return of(MOCK_SCHEMAS.find(schema => schema.title === name));
    }
}
