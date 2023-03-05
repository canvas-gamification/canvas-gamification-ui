import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseHomepageComponent} from './course-homepage.component'
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/course.service.mock"
import {ActivatedRoute} from "@angular/router"

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

    // TODO: (Seth) fix
    xit('should create', () => {
        expect(component).toBeTruthy()
    })
})
