import {fakeAsync, TestBed, tick} from '@angular/core/testing'

import {CoursesService} from './courses.service'
import {MOCK_VIEW_COURSE} from "@app/admin/_test/mock"
import {ApiService} from "@app/_services/api.service"
import {HttpTestingController} from "@angular/common/http/testing"
import {TestModule} from "@test/test.module"

describe('ViewCoursesService', () => {
    let service: CoursesService
    let apiService: ApiService
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [CoursesService]
        })
        service = TestBed.inject(CoursesService)
        apiService = TestBed.inject(ApiService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should get courses', fakeAsync(() => {
        service.getCourses().subscribe((courses) => {
            expect(courses).toEqual([MOCK_VIEW_COURSE])
        })
        const request = httpMock.expectOne(apiService.getURL('admin/courses'))
        expect(request.request.method).toBe('GET')
        request.flush([MOCK_VIEW_COURSE])
        tick()
    }))
})
