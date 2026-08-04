import {Component, ChangeDetectionStrategy} from '@angular/core'

@Component({
    selector: 'app-course-registration-step',
    templateUrl: './course-registration-step.component.html',
    styleUrls: ['./course-registration-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CourseRegistrationStepComponent {
    visible = false
}
