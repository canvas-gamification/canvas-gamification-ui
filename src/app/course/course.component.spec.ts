import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseComponent} from './course.component';
import {TestModule} from '@test/test.module';
import {CourseService} from "@app/course/_services/course.service";
import {CourseServiceMock} from "@test/course.service.mock";
import {MOCK_COURSE} from "@app/problems/_test/mock";
import {ActivatedRoute} from "@angular/router";

describe('CourseComponent', () => {
    let component: CourseComponent;
    let fixture: ComponentFixture<CourseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [CourseComponent],
            providers: [
                {provider: CourseService, useClass: CourseServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            params: {
                                courseId: 0
                            }
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('course should be retrieved on initial load', () => {
        expect(component.course).toEqual(MOCK_COURSE);
    });
});
