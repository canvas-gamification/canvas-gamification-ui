import {ConsentFormData} from "@app/accounts/_forms/consent.form"
import {Observable, of} from "rxjs"
import {UserConsent} from "@app/_models/user_consent"
import {MOCK_ADMIN_CONSENT} from "@app/accounts/_test/mock"

export class ConsentServiceMock {
    postConsent(input: ConsentFormData): Observable<UserConsent> {
        return of(MOCK_ADMIN_CONSENT)
    }

    getConsent(): Observable<UserConsent[]> {
        return of([MOCK_ADMIN_CONSENT])
    }

    declineConsent(): Observable<UserConsent> {
        return of(MOCK_ADMIN_CONSENT)
    }
}
