import {ComponentFixture, TestBed} from '@angular/core/testing'

import {
    CourseRegistrationStepperComponent
} from '../../../course-registration/course-registration-stepper/course-registration-stepper.component'
import {TestModule} from "@test/test.module"
import {TuiStepper} from "@taiga-ui/kit"

describe('CourseRegistrationStepperComponent', () => {
    let component: CourseRegistrationStepperComponent
    let fixture: ComponentFixture<CourseRegistrationStepperComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, ...TuiStepper],
            declarations: [CourseRegistrationStepperComponent]
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

    it('should render a step per configured step', () => {
        const steps = fixture.nativeElement.querySelectorAll('[tuiStep]')
        expect(steps.length).toEqual(3)
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
        expect(component.completedSteps.has(0)).toBeTrue()
    })
})
