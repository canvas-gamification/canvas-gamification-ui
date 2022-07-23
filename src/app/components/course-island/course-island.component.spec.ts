import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseIslandComponent} from './course-island.component'
import {GetColorFromStringPipe} from "@app/_helpers/pipes/get-color-from-string.pipe"
import {MOCK_COURSE1} from "@app/course/_test/mock"

describe('CourseIslandComponent', () => {
    let component: CourseIslandComponent
    let fixture: ComponentFixture<CourseIslandComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CourseIslandComponent, GetColorFromStringPipe]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseIslandComponent)
        component = fixture.componentInstance
        component.course = MOCK_COURSE1
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
