import {fakeAsync, TestBed, tick} from '@angular/core/testing'

import {CourseService} from './course.service'
import {TestModule} from '@test/test.module'
import {ApiService} from "@app/_services/api.service"
import {HttpTestingController} from "@angular/common/http/testing"
import {
    MOCK_COURSE1,
    MOCK_COURSES,
    MOCK_USER_STATS,
} from "@app/course/_test/mock"

describe('CourseService', () => {
    let courseService: CourseService
    let apiService: ApiService
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [CourseService, ApiService]
        })
        courseService = TestBed.inject(CourseService)
        apiService = TestBed.inject(ApiService)
        httpMock = TestBed.inject(HttpTestingController)
    })
    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(courseService).toBeTruthy()
    })

    it('getCourseEvent should return a single courseEvent', fakeAsync(() => {
        courseService.getUserStats(0, 1).subscribe((userStats) => {
            expect(userStats).toEqual(MOCK_USER_STATS)
        })
        const request = httpMock.expectOne(apiService.getURL('course', 0, 'user-stats', 1))
        expect(request.request.method).toBe('GET')
        request.flush(MOCK_USER_STATS)
        tick()
    }))

    it('validateEvent should return truthy value', fakeAsync(() => {
        courseService.validateEvent(0, 1).subscribe((response) => {
            expect(response).toBeTruthy()
        })
        const request = httpMock.expectOne(apiService.getURL('course', 0, 'validate-event', 1))
        expect(request.request.method).toBe('GET')
        request.flush({success: true})
        tick()
    }))

    it('getCourses', fakeAsync(() => {
        courseService.getCourses().subscribe((response) => {
            expect(response).toEqual(MOCK_COURSES)
        })
        const request = httpMock.expectOne('http://localhost:8000/api/course/?registered=false&page=1&page_size=50&ordering=')
        expect(request.request.method).toBe('GET')
        request.flush(MOCK_COURSES)
        tick()
    }))

    it('getCourse should work', fakeAsync(() => {
        courseService.getCourse(0).subscribe((response) => {
            expect(response).toEqual(MOCK_COURSE1)
        })
        const request = httpMock.expectOne(apiService.getURL('course', 0))
        expect(request.request.method).toBe('GET')
        request.flush(MOCK_COURSE1)
        tick()
    }))
})
