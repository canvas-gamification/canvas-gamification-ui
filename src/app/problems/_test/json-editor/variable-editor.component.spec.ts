import { TuiLabel } from "@taiga-ui/core";
import { TuiIslandDirective, TuiInputModule } from "@taiga-ui/legacy";
import {ComponentFixture, TestBed} from '@angular/core/testing'

import {VariablesEditorComponent} from '../../json-editor/variables-editor/variables-editor.component'
import {TestModule} from "@test/test.module"
import { TuiFieldErrorPipe, TuiFieldErrorContentPipe } from "@taiga-ui/kit"
import {UntypedFormArray, UntypedFormGroup, ReactiveFormsModule} from "@angular/forms"

describe('VariableEditorComponent', () => {
    let component: VariablesEditorComponent
    let fixture: ComponentFixture<VariablesEditorComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VariablesEditorComponent],
            imports: [
                TestModule, ReactiveFormsModule, TuiInputModule, TuiLabel,
                TuiFieldErrorPipe, TuiFieldErrorContentPipe, TuiIslandDirective
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(VariablesEditorComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should get values', () => {
        const form = new UntypedFormGroup({values: new UntypedFormArray([])})
        expect(component.getValues(form)).toBeTruthy()
    })

    it('should add value', () => {
        const form = new UntypedFormGroup({values: new UntypedFormArray([])})
        spyOn(component.getValues(form), 'push').and.callThrough()
        const valLength = component.getValues(form).length
        component.addNewValue(form)
        expect(component.getValues(form).push).toHaveBeenCalled()
        expect(component.getValues(form).length).toBe(valLength + 1)
    })

    it('should remove value', () => {
        const form = new UntypedFormGroup({values: new UntypedFormArray([])})
        component.addNewValue(form)
        spyOn(component.getValues(form), 'removeAt').and.callThrough()
        const valLength = component.getValues(form).length
        component.removeValue(form, 0)
        expect(component.getValues(form).removeAt).toHaveBeenCalled()
        expect(component.getValues(form).length).toBe(valLength - 1)
    })
})
