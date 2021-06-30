import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Category} from "@app/_models";
import {MOCK_CATEGORIES} from "@app/problems/_tests/mock";

@Injectable({
    providedIn: 'root',
})
export class CategoryServiceMock {
    getCategories(): Observable<Category[]> {
        return of(MOCK_CATEGORIES);
    }

    getCategory(categoryId: number): Observable<Category> {
        return of(MOCK_CATEGORIES.find(category => category.pk === categoryId));
    }
}
