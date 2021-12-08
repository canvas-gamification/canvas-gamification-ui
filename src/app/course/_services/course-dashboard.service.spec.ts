import {TestBed} from '@angular/core/testing';
import {CourseDashboardService} from './course-dashboard.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {MOCK_COURSE_REGISTRATION, MOCK_REGISTRATION_UPDATE_DATA} from "@app/course/_test/mock";

describe('TestService', () => {
    let courseDashboardService: CourseDashboardService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        courseDashboardService = TestBed.inject(CourseDashboardService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(courseDashboardService).toBeTruthy();
    });

    it('getCourseUsers should return a list of users', () => {
        courseDashboardService.getCourseUsers(0).subscribe((users) => {
            expect(users).toEqual([MOCK_COURSE_REGISTRATION]);
        });
        const request = httpMock.expectOne(apiService.getURL('course-admin', 0, 'registered-users'));
        expect(request.request.method).toBe('GET');
        request.flush([MOCK_COURSE_REGISTRATION]);
    });

    it('updateStatus should update a new Course Event', () => {
        courseDashboardService.updateStatus(MOCK_REGISTRATION_UPDATE_DATA).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('course-admin', 'change-status'));
        expect(request.request.method).toBe('POST');
    });

    it('getCourseUsersFilter should return a list of users', () => {
        courseDashboardService.getCourseUsersFilter(0).subscribe((users) => {
            expect(users).toEqual([MOCK_COURSE_REGISTRATION]);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/course-admin/0/registered-users/?search=');
        expect(request.request.method).toBe('GET');
        request.flush([MOCK_COURSE_REGISTRATION]);
    });

    it('unregisterUser should update a new Course Event', () => {
        courseDashboardService.updateStatus(MOCK_REGISTRATION_UPDATE_DATA).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('course-admin', 'change-registration'));
        expect(request.request.method).toBe('POST');
    });
});
