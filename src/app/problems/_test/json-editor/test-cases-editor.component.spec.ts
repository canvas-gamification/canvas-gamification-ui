import { TuiLabel } from "@taiga-ui/core";
import { TuiIslandDirective, TuiInputModule } from "@taiga-ui/legacy";
import {ComponentFixture, TestBed} from '@angular/core/testing'

import {TestCasesEditorComponent} from '../../json-editor/test-cases-editor/test-cases-editor.component'
import {TestModule} from "@test/test.module"
import { TuiFieldErrorPipe, TuiFieldErrorContentPipe } from "@taiga-ui/kit"
import {ReactiveFormsModule} from "@angular/forms"

describe('TestCasesEditorComponent', () => {
    let component: TestCasesEditorComponent
    let fixture: ComponentFixture<TestCasesEditorComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestCasesEditorComponent],
            imports: [
                TestModule, ReactiveFormsModule, TuiInputModule, TuiLabel,
                TuiFieldErrorPipe, TuiFieldErrorContentPipe, TuiIslandDirective
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCasesEditorComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
