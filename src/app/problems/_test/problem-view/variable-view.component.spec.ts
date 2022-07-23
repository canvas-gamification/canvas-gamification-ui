import {ComponentFixture, TestBed} from '@angular/core/testing'

import {VariableViewComponent} from '../../problem-view/variable-view/variable-view.component'
import {TestModule} from '@test/test.module'
import {MOCK_VARIABLES} from "@app/problems/_test/mock"

describe('VariableViewComponent', () => {
    let component: VariableViewComponent
    let fixture: ComponentFixture<VariableViewComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [VariableViewComponent]
        }).compileComponents()
    })

    describe('With Variables', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(VariableViewComponent)
            component = fixture.componentInstance
            component.variables = MOCK_VARIABLES
            component.variableErrors = []
            fixture.detectChanges()
        })

        it('should create with variables', () => {
            expect(component).toBeTruthy()
            expect(component.generatedVariables.length).toEqual(1)
        })
    })

    describe('Without Variables', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(VariableViewComponent)
            component = fixture.componentInstance
            component.variables = []
            component.variableErrors = []
            fixture.detectChanges()
        })

        it('should create without variables', () => {
            expect(component).toBeTruthy()
            expect(component.generatedVariables).toEqual([])
        })
    })

})
