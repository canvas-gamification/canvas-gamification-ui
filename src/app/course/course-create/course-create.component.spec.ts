import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseCreateComponent} from './course-create.component'
import {TestModule} from "@test/test.module"
import { TuiInputDateRangeModule, TuiInputModule, TuiSelectModule, TuiTextareaModule, TuiFieldErrorPipeModule } from "@taiga-ui/kit"
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
                TuiTextareaModule,
                TuiInputDateRangeModule,
                TuiSelectModule,
                ReactiveFormsModule,
                RouterModule,
                TuiButtonModule,
                TuiDataListModule,
                TuiFieldErrorPipeModule,
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
