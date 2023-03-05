import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseHomepageComponent} from './course-homepage.component'
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/course.service.mock"
import {ActivatedRoute} from "@angular/router"
import {of} from "rxjs";
import {MOCK_STUDENT} from "@app/accounts/_test/mock";
import {AuthenticationService} from "@app/_services/api/authentication";

describe('CourseHomepageComponent', () => {
    let component: CourseHomepageComponent
    let fixture: ComponentFixture<CourseHomepageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CourseHomepageComponent],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            parent: {
                                params: {
                                    courseId: 0
                                }
                            }
                        }
                    }
                },
                {
                    provide: AuthenticationService, useValue: {
                        currentUser: of(MOCK_STUDENT)
                    }
                }
            ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseHomepageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
