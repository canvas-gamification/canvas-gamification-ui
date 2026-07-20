import { TuiTextareaModule, TuiInputModule, TuiInputDateRangeModule, TuiSelectModule } from "@taiga-ui/legacy";
import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseCreateComponent} from './course-create.component'
import {TestModule} from "@test/test.module"
import { TuiFieldErrorPipe, TuiFieldErrorContentPipe } from "@taiga-ui/kit"
import {ReactiveFormsModule} from "@angular/forms"
import {RouterModule} from "@angular/router"
import { TuiDataList, TuiButton } from "@taiga-ui/core"

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
                TuiButton,
                TuiDataList,
                TuiFieldErrorPipe, TuiFieldErrorContentPipe,
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
