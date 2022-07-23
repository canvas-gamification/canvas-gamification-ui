import {ComponentFixture, TestBed} from '@angular/core/testing'

import {
    CourseRegistrationStepperComponent
} from '../../../course-registration/course-registration-stepper/course-registration-stepper.component'
import {TestModule} from "@test/test.module"
import {TuiStepComponent, TuiStepperComponent, TuiStepperModule} from "@taiga-ui/kit"

describe('CourseRegistrationStepperComponent', () => {
    let component: CourseRegistrationStepperComponent
    let fixture: ComponentFixture<CourseRegistrationStepperComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, TuiStepperModule],
            declarations: [CourseRegistrationStepperComponent, TuiStepperComponent, TuiStepComponent]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseRegistrationStepperComponent)
        component = fixture.componentInstance
        component.steps = ['1', '2', '3']
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should get correct step number', () => {
        component.currentStep = 0
        fixture.detectChanges()
        expect(component.currentStep).toEqual(0)
    })

    it('should get existing taiga step components', () => {
        expect(component.getStep(0)).toEqual(jasmine.any(TuiStepComponent))
        expect(component.getStep(1)).toEqual(jasmine.any(TuiStepComponent))
        expect(component.getStep(2)).toEqual(jasmine.any(TuiStepComponent))
    })

    it('should not get out of index taiga step component', () => {
        expect(component.getStep(3)).toEqual(undefined)
    })

    it('should set next step', () => {
        spyOn(component, 'setStepComplete').and.callThrough()
        expect(component.currentStep).toEqual(0)
        component.setNextStep()
        expect(component.currentStep).toEqual(1)
        expect(component.setStepComplete).toHaveBeenCalled()
    })

    it('should set previous step', () => {
        component.setPrevStep()
        expect(component.currentStep).toEqual(-1)
    })

    it('should mark step as complete', () => {
        component.setStepComplete(0)
        const step = component.getStep(0)
        expect(step.state).toEqual('pass')
        expect(step.icon).toEqual('tuiIconCheckLarge')
    })
})
