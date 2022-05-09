import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CourseEventService} from './course-event.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {MOCK_COURSE_EVENT} from "@app/problems/_test/mock";
import {MOCK_COURSE1, MOCK_EVENT_TYPES} from "@app/course/_test/mock";
import {HttpResponse} from "@angular/common/http";

describe('CourseEventService', () => {
    let courseEventService: CourseEventService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [CourseEventService, ApiService]
        });
        courseEventService = TestBed.inject(CourseEventService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(courseEventService).toBeTruthy();
    });

    it('getCourseEvent should return a single courseEvent', fakeAsync(() => {
        courseEventService.getCourseEvent(0).subscribe((courseEvent) => {
            expect(courseEvent).toEqual(MOCK_COURSE_EVENT);
        });
        const request = httpMock.expectOne(apiService.getURL('event', 0));
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_COURSE_EVENT);
        tick();
    }));

    it('deleteCourseEvent deletes a course event', fakeAsync(() => {
        courseEventService.deleteCourseEvent(0).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('event', 0));
        expect(request.request.method).toBe('DELETE');
        request.flush('Course Event Deleted');
        tick();
    }));

    it('addCourseEvent should add a new Course Event', fakeAsync(() => {
        courseEventService.addCourseEvent(MOCK_COURSE_EVENT).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('event'));
        expect(request.request.method).toBe('POST');
        request.flush(MOCK_COURSE_EVENT);
        tick();
    }));

    it('updateCourseEvent should update a new Course Event', fakeAsync(() => {
        courseEventService.updateCourseEvent(MOCK_COURSE_EVENT).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('event', MOCK_COURSE_EVENT.id));
        expect(request.request.method).toBe('PUT');
        request.flush(MOCK_COURSE_EVENT);
        tick();
    }));

    it('getEventTypes', fakeAsync(() => {
        courseEventService.getEventTypes().subscribe((eventTypes) => {
            expect(eventTypes).toEqual(MOCK_EVENT_TYPES);
        });
        const request = httpMock.expectOne(apiService.getURL('event', 'get-event-types'));
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_EVENT_TYPES);
        tick();
    }));

    it('getAllEvents', fakeAsync(() => {
        courseEventService.getAllEvents().subscribe((events) => {
            expect(events).toEqual([MOCK_COURSE_EVENT]);
        });
        const request = httpMock.expectOne(apiService.getURL('event'));
        expect(request.request.method).toBe('GET');
        request.flush([MOCK_COURSE_EVENT]);
        tick();
    }));

    it('import a courseEvent by clicking the import button', fakeAsync(() => {
        courseEventService.importCourseEvent(MOCK_COURSE_EVENT, MOCK_COURSE1.id).subscribe((response) => {
            expect(response.status).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('event', 'import-event'));
        expect(request.request.method).toBe('POST');
        request.flush(new HttpResponse());
        tick();
    }));
});
