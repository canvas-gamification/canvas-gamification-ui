import {TestBed} from '@angular/core/testing';

import {CourseService} from './course.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {
    MOCK_CONFIRM_RESPONSE1, MOCK_CONFIRM_RESPONSE2_FAIL, MOCK_CONFIRM_RESPONSE2_SUCCESS,
    MOCK_CONFIRM_STEP1, MOCK_CONFIRM_STEP2_FAIL, MOCK_CONFIRM_STEP2_SUCCESS,
    MOCK_COURSE1,
    MOCK_COURSES,
    MOCK_IDENTIFICATION_RESPONSE1, MOCK_IDENTIFICATION_RESPONSE2,
    MOCK_IDENTIFICATION_STEP1, MOCK_IDENTIFICATION_STEP2,
    MOCK_REGISTRATION_STATUS,
    MOCK_USER_STATS, MOCK_VERIFY_FAIL, MOCK_VERIFY_STEP1, MOCK_VERIFY_STEP1_FAIL, MOCK_VERIFY_SUCCESS
} from "@app/course/_test/mock";

describe('CourseService', () => {
    let courseService: CourseService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [CourseService, ApiService]
        });
        courseService = TestBed.inject(CourseService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(courseService).toBeTruthy();
    });

    it('getCourseEvent should return a single courseEvent', () => {
        courseService.getUserStats(0, 1).subscribe((userStats) => {
            expect(userStats).toEqual(MOCK_USER_STATS);
        });
        const request = httpMock.expectOne(apiService.getURL('course', 0, 'user-stats', 1));
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_USER_STATS);
    });

    it('getCourseRegistrationStatus', () => {
        courseService.getCourseRegistrationStatus(0).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('course', 0, 'get-registration-status'));
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_REGISTRATION_STATUS);
    });

    it('validateEvent should return truthy value', () => {
        courseService.validateEvent(0, 1).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('course', 0, 'validate-event', 1));
        expect(request.request.method).toBe('GET');
        request.flush({success: true});
    });

    it('getCourses', () => {
        courseService.getCourses().subscribe((response) => {
            expect(response).toEqual(MOCK_COURSES);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/course/?registered=false&page=1&page_size=50&ordering=');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_COURSES);
    });

    it('getCourse should work', () => {
        courseService.getCourse(0).subscribe((response) => {
            expect(response).toEqual(MOCK_COURSE1);
        });
        const request = httpMock.expectOne(apiService.getURL('course', 0));
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_COURSE1);
    });

    it('register method should work for single student', () => {
        courseService.register(0, MOCK_IDENTIFICATION_STEP1).subscribe((response) => {
            expect(response).toEqual(MOCK_IDENTIFICATION_RESPONSE1);
        });
        const request = httpMock.expectOne(apiService.getURL('course', 0, 'register'));
        expect(request.request.method).toBe('POST');
        request.flush(MOCK_IDENTIFICATION_RESPONSE1);
    });

    it('register method should work for single student when confirming name', () => {
        courseService.register(0, MOCK_CONFIRM_STEP1).subscribe((response) => {
            expect(response).toEqual(MOCK_CONFIRM_RESPONSE1);
        });
        const request = httpMock.expectOne(apiService.getURL('course', 0, 'register'));
        expect(request.request.method).toBe('POST');
        request.flush(MOCK_CONFIRM_RESPONSE1);
    });

    it('register method should work for multiple students with same name', () => {
        courseService.register(0, MOCK_IDENTIFICATION_STEP2).subscribe((response) => {
            expect(response).toEqual(MOCK_IDENTIFICATION_RESPONSE2);
        });
        const request = httpMock.expectOne(apiService.getURL('course', 0, 'register'));
        expect(request.request.method).toBe('POST');
        request.flush(MOCK_IDENTIFICATION_RESPONSE2);
    });

    it('register method should work for single student when confirming with correct student number', () => {
        courseService.register(0, MOCK_CONFIRM_STEP2_SUCCESS).subscribe((response) => {
            expect(response).toEqual(MOCK_CONFIRM_RESPONSE2_SUCCESS);
        });
        const request = httpMock.expectOne(apiService.getURL('course', 0, 'register'));
        expect(request.request.method).toBe('POST');
        request.flush(MOCK_CONFIRM_RESPONSE2_SUCCESS);
    });

    it('register method should work for single student when confirming with incorrect student number', () => {
        courseService.register(0, MOCK_CONFIRM_STEP2_FAIL).subscribe((response) => {
            expect(response).toEqual(MOCK_CONFIRM_RESPONSE2_FAIL);
        });
        const request = httpMock.expectOne(apiService.getURL('course', 0, 'register'));
        expect(request.request.method).toBe('POST');
        request.flush(MOCK_CONFIRM_RESPONSE2_FAIL);
    });

    it('verify method should work for single student with correct code', () => {
        courseService.registerVerify(0, MOCK_VERIFY_STEP1).subscribe((response) => {
            expect(response).toEqual(MOCK_VERIFY_SUCCESS);
        });
        const request = httpMock.expectOne(apiService.getURL('course', 0, 'verify'));
        expect(request.request.method).toBe('POST');
        request.flush(MOCK_VERIFY_SUCCESS);
    });

    it('verify method should work for single student with incorrect code', () => {
        courseService.registerVerify(0, MOCK_VERIFY_STEP1_FAIL).subscribe((response) => {
            expect(response).toEqual(MOCK_VERIFY_FAIL);
        });
        const request = httpMock.expectOne(apiService.getURL('course', 0, 'verify'));
        expect(request.request.method).toBe('POST');
        request.flush(MOCK_VERIFY_FAIL);
    });
});
