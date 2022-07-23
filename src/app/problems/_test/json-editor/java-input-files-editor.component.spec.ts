import {ComponentFixture, TestBed} from '@angular/core/testing'

import {
    JavaInputFilesEditorComponent
} from '../../json-editor/java-input-files-editor/java-input-files-editor.component'
import {TestModule} from "@test/test.module"
import {TuiCheckboxLabeledModule, TuiFieldErrorModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit"
import {ReactiveFormsModule} from "@angular/forms"

describe('JavaInputFilesEditorComponent', () => {
    let component: JavaInputFilesEditorComponent
    let fixture: ComponentFixture<JavaInputFilesEditorComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [JavaInputFilesEditorComponent],
            imports: [
                TestModule, ReactiveFormsModule, TuiInputModule, TuiCheckboxLabeledModule,
                TuiFieldErrorModule, TuiIslandModule
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
