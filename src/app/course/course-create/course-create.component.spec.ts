import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseCreateComponent} from './course-create.component'
import {TestModule} from "@test/test.module"
import {
    TuiFieldErrorModule,
    TuiInputDateRangeModule,
    TuiInputModule,
    TuiSelectModule,
    TuiTextAreaModule
} from "@taiga-ui/kit"
import {ReactiveFormsModule} from "@angular/forms"
import {RouterModule} from "@angular/router"
import {TuiButtonModule, TuiDataListModule} from "@taiga-ui/core"

describe('CourseCreateComponent', () => {
    let component: CourseCreateComponent
    let fixture: ComponentFixture<CourseCreateComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestModule,
                TuiInputModule,
                TuiTextAreaModule,
                TuiInputDateRangeModule,
                TuiSelectModule,
                ReactiveFormsModule,
                RouterModule,
                TuiButtonModule,
                TuiDataListModule,
                TuiFieldErrorModule,
            ],
            declarations: [CourseCreateComponent]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseCreateComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
