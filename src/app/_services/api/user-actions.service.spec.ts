import {fakeAsync, TestBed, tick} from '@angular/core/testing'

import {UserActionsService} from './user-actions.service'
import {TestModule} from '@test/test.module'
import {ApiService} from "@app/_services/api.service"
import {HttpTestingController} from "@angular/common/http/testing"
import {MOCK_USER_ACTIONS} from "@test/mock"

describe('UserActionsService', () => {
    let userActionsService: UserActionsService
    let apiService: ApiService
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [UserActionsService, ApiService]
        })
        userActionsService = TestBed.inject(UserActionsService)
        apiService = TestBed.inject(ApiService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(userActionsService).toBeTruthy()
    })

    it('should return all actions', fakeAsync(() => {
        userActionsService.getUserActions().subscribe((actions) => {
            expect(actions.results).toEqual(MOCK_USER_ACTIONS)
        })
        const request = httpMock.expectOne('http://localhost:8000/api/user-actions/?page=1&page_size=100&ordering=')
        expect(request.request.method).toBe('GET')
        request.flush({
            count: 2,
            next: '',
            previous: '',
            results: MOCK_USER_ACTIONS
        })
        tick()
    }))

    it('should return first action', fakeAsync(() => {
        userActionsService.getUserAction(0).subscribe((action) => {
            expect(action).toEqual(MOCK_USER_ACTIONS[0])
        })
        const request = httpMock.expectOne(apiService.getURL('user-actions', 0))
        expect(request.request.method).toBe('GET')
        request.flush(MOCK_USER_ACTIONS[0])
        tick()
    }))
})
