import {fakeAsync, TestBed, tick} from '@angular/core/testing'
import {UserStatsService} from './user-stats.service'
import {TestModule} from '@test/test.module'
import {ApiService} from "@app/_services/api.service"
import {HttpTestingController} from "@angular/common/http/testing"
import {MOCK_USER_DIFFICULTY_STATS} from "@app/problems/_test/mock"

describe('UserStatsService', () => {
    let userStatsService: UserStatsService
    let apiService: ApiService
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [ApiService]
        })
        userStatsService = TestBed.inject(UserStatsService)
        apiService = TestBed.inject(ApiService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(userStatsService).toBeTruthy()
    })

    it('should return difficultyUserStats', fakeAsync(() => {
        userStatsService.getUserDifficultyStats(0).subscribe((stats) => {
            expect(stats).toEqual(MOCK_USER_DIFFICULTY_STATS)
        })
        const request = httpMock.expectOne(apiService.getURL('user-stats/difficulty', 0))
        expect(request.request.method).toBe('GET')
        request.flush(MOCK_USER_DIFFICULTY_STATS)
        tick()
    }))
})
