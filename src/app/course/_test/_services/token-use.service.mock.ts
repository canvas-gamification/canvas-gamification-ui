import {Injectable} from "@angular/core"
import {APIResponse} from "@app/_models"
import {Observable, of} from "rxjs"

@Injectable({
    providedIn: 'root'
})
export class TokenUseServiceMock {
    useTokens(tokenActions: unknown, courseId: number): Observable<APIResponse> {
        if (courseId === 0)
            return of({success: false, bad_request: true})
        else
            return of({success: false})
    }

}
