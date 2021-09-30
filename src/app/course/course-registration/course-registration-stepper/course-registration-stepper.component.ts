import {Component, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {TuiStepComponent, TuiStepperComponent} from "@taiga-ui/kit";

@Component({
    selector: 'app-course-registration-stepper',
    templateUrl: './course-registration-stepper.component.html',
    styleUrls: ['./course-registration-stepper.component.scss']
})
export class CourseRegistrationStepperComponent {
    @Input()
    steps: string[];

    @ViewChild('stepperHeader')
    stepperComponent!: TuiStepperComponent;
    @ViewChildren('headerStep')
    stepComponents!: QueryList<TuiStepComponent>;

    /**
     * Get the current stepper number
     */
    getCurrentStepNumber(): number {
        return this.stepperComponent.activeItemIndex;
    }

    /**
     * Get the current TuiStepComponent
     * @param stepNumber
     */
    getStep(stepNumber: number): TuiStepComponent {
        return this.stepComponents.toArray()[stepNumber];
    }

    /**
     * Set the steppers current step
     * @param stepNumber
     * @private
     */
    private setStep(stepNumber: number): void {
        this.stepperComponent.activate(stepNumber);
    }

    /**
     * Set the step to be the next step
     */
    setNextStep(): void {
        this.setStepComplete(this.getCurrentStepNumber());
        this.setStep(this.getCurrentStepNumber() + 1);
    }

    /**
     * Set the step to be the previous step
     */
    setPrevStep(): void {
        this.setStep(this.getCurrentStepNumber() - 1);
    }

    /**
     * Update the stepper ui to visually mark the step as complete
     * @param stepNumber
     */
    setStepComplete(stepNumber: number): void {
        this.getStep(stepNumber).state = 'pass';
        this.getStep(stepNumber).icon = 'tuiIconCheckLarge';
    }
}
