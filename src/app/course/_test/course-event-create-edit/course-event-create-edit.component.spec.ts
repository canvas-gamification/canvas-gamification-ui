import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseEventCreateEditComponent} from '../../course-event-create/course-event-create-edit.component';
import {TestModule} from '@test/test.module';
import {CourseEventServiceMock} from "@app/problems/_test/course-event.service.mock";
import {CourseEventService} from "@app/course/_services/course-event.service";
import {ActivatedRoute, convertToParamMap, Router, RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {TuiNotificationsService} from "@taiga-ui/core";
import {of} from "rxjs";

describe('CourseEventCreateComponent with EventId', () => {
    let component: CourseEventCreateEditComponent;
    let fixture: ComponentFixture<CourseEventCreateEditComponent>;
    let notificationService: TuiNotificationsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule,
                MatFormFieldModule,
                MatInputModule,
                MatDatepickerModule,
                NgxMatDatetimePickerModule,
                ReactiveFormsModule,
                RouterModule],
            declarations: [CourseEventCreateEditComponent],
            providers: [
                {provide: CourseEventService, useClass: CourseEventServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({
                                eventId: 1,
                                courseId: 1
                            })
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        notificationService = TestBed.inject(TuiNotificationsService);
        spyOn(notificationService, 'show').and.callFake(() => {
            return of();
        });
        fixture = TestBed.createComponent(CourseEventCreateEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form data should be filled with data', () => {
        expect(component.formData).toBeTruthy();
    });

    it('submitEvent should work with eventId', () => {
        component.submitEvent(component.formData);
        expect(notificationService.show).toHaveBeenCalled();
    });
});

describe('CourseEventCreateComponent without EventId', () => {
    let component: CourseEventCreateEditComponent;
    let fixture: ComponentFixture<CourseEventCreateEditComponent>;
    let router: Router;
    let notificationService: TuiNotificationsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule,
                MatFormFieldModule,
                MatInputModule,
                MatDatepickerModule,
                NgxMatDatetimePickerModule,
                ReactiveFormsModule,
                RouterModule],
            declarations: [CourseEventCreateEditComponent],
            providers: [
                {provide: CourseEventService, useClass: CourseEventServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({
                                courseId: 1
                            })
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        router = TestBed.inject(Router);
        spyOn(router, 'navigate');
        notificationService = TestBed.inject(TuiNotificationsService);
        spyOn(notificationService, 'show').and.callFake(() => {
            return of();
        });
        fixture = TestBed.createComponent(CourseEventCreateEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('submitEvent should work without eventId', () => {
        component.submitEvent(component.formData);
        expect(notificationService.show).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledOnceWith(['course', 1]);
    });
});
