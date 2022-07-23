import {Injectable} from "@angular/core"
import {Observable, of} from "rxjs"
import {PaginatedResult} from "@app/_models/paginatedResult"
import {MOCK_USER_ACTIONS} from "@test/mock"
import {Action} from "@app/_models"

@Injectable({
    providedIn: 'root'
})
export class UserActionsServiceMock {
    getUserActions(options?: {
        filters?: unknown,
        ordering?: string,
        page?: number,
        page_size?: number,
        recent?: boolean
    }): Observable<PaginatedResult<Action>> {
        const actions: PaginatedResult<Action> = {
            count: 2,
            next: '',
            previous: '',
            results: MOCK_USER_ACTIONS
        }
        return of(actions)
    }

    getUserAction(actionId: number): Observable<Action> {
        return of(MOCK_USER_ACTIONS[0])
    }
}
