import {Observable, of} from "rxjs";
import {NestedCategories} from "@app/_models";
import {MOCK_NESTED_CATEGORY_2} from "@app/admin/_test/mock";

export class CategoryStatsServiceMock {
    getCategoryStats(): Observable<NestedCategories[]> {
        return of([MOCK_NESTED_CATEGORY_2]);
    }
}
