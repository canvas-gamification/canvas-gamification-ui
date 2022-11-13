import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseHomepageComponent} from './course-homepage.component'

describe('CourseHomepageComponent', () => {
    let component: CourseHomepageComponent
    let fixture: ComponentFixture<CourseHomepageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ CourseHomepageComponent ]
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
