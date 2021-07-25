import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseEventCreateEditComponent} from '../../course-event-create/course-event-create-edit.component';
import {TestModule} from '@test/test.module';
import {CourseEventServiceMock} from "@app/problems/_test/course-event.service.mock";
import {CourseEventService} from "@app/course/_services/course-event.service";
import {ActivatedRoute, convertToParamMap, RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
describe('CourseEventCreateComponent without EventId', () => {
    let component: CourseEventCreateEditComponent;
    let fixture: ComponentFixture<CourseEventCreateEditComponent>;

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
});
