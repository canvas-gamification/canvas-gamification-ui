import { TuiLabel } from "@taiga-ui/core";
import { TuiIslandDirective, TuiInputModule } from "@taiga-ui/legacy";
import {ComponentFixture, TestBed} from '@angular/core/testing'

import {
    JavaInputFilesEditorComponent
} from '../../json-editor/java-input-files-editor/java-input-files-editor.component'
import {TestModule} from "@test/test.module"
import { TuiFieldErrorPipe, TuiFieldErrorContentPipe } from "@taiga-ui/kit"
import {ReactiveFormsModule} from "@angular/forms"

describe('JavaInputFilesEditorComponent', () => {
    let component: JavaInputFilesEditorComponent
    let fixture: ComponentFixture<JavaInputFilesEditorComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [JavaInputFilesEditorComponent],
            imports: [
                TestModule, ReactiveFormsModule, TuiInputModule, TuiLabel,
                TuiFieldErrorPipe, TuiFieldErrorContentPipe, TuiIslandDirective
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(JavaInputFilesEditorComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
