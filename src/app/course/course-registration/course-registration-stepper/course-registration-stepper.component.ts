import {
    AfterContentChecked,
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Input,
    QueryList,
    ViewChildren
} from '@angular/core';
import {TUI_VALIDATION_ERRORS, TuiStepComponent} from "@taiga-ui/kit";
import {CourseRegistrationStepComponent} from "@app/course/course-registration/course-registration-step/course-registration-step.component";

@Component({
    selector: 'app-course-registration-stepper',
    templateUrl: './course-registration-stepper.component.html',
    styleUrls: ['./course-registration-stepper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'This field is required!'
            },
        },
    ],
})
export class CourseRegistrationStepperComponent implements AfterContentInit, AfterContentChecked {
    @Input()
    steps: string[] = [];
    currentStep = 0;
    @ViewChildren('headerStep')
    tuiStepComponents!: QueryList<TuiStepComponent>;
    @ContentChildren(CourseRegistrationStepComponent)
    stepComponents!: QueryList<CourseRegistrationStepComponent>;

    constructor(private changeDetector: ChangeDetectorRef) {
    }

    ngAfterContentInit(): void {
        this.setStep(this.currentStep);
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    /**
     * Get the current TuiStepComponent
     * @param stepNumber
     */
    getStep(stepNumber: number): TuiStepComponent {
        return this.tuiStepComponents.toArray()[stepNumber];
    }

    /**
     * Set the steppers current step
     * @param stepNumber
     * @private
     */
    private setStep(stepNumber: number): void {
        this.currentStep = stepNumber;
        this.stepComponents.toArray().forEach((stepComponent, index) => stepComponent.visible = stepNumber === index);
    }

    /**
     * Set the step to be the next step
     */
    setNextStep(): void {
        this.setStepComplete(this.currentStep);
        this.setStep(this.currentStep + 1);
    }

    /**
     * Set the step to be the previous step
     */
    setPrevStep(): void {
        this.setStep(this.currentStep - 1);
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
