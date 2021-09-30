import {Component, Input} from '@angular/core';
import {CourseRegistrationStepperComponent} from "@app/course/course-registration/course-registration-stepper/course-registration-stepper.component";

@Component({
    selector: 'app-course-registration-step',
    templateUrl: './course-registration-step.component.html',
    styleUrls: ['./course-registration-step.component.scss']
})
export class CourseRegistrationStepComponent {
    @Input()
    stepNumber: number;
    @Input()
    stepper: CourseRegistrationStepperComponent;

    showStep(): boolean {
        if (this.stepper)
            return this.stepper.getCurrentStepNumber() === this.stepNumber;
        return false;
    }
}
