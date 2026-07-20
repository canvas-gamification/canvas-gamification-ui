import {Component, Input, ChangeDetectionStrategy} from '@angular/core'
import {GoalItemSubmissionStats} from "@app/_models/goal/goal"

@Component({
    selector: 'app-submission-chart',
    templateUrl: './submission-chart.component.html',
    styleUrls: ['./submission-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SubmissionChartComponent {

    @Input() submissionStats: GoalItemSubmissionStats
    activeItemIndex = NaN


    values(): number[] {
        return [this.submissionStats.correct, this.submissionStats.partially_correct, this.submissionStats.wrong]
    }

    value(): number {
        if (isNaN(this.activeItemIndex))
            return this.submissionStats.total
        return this.values()[this.activeItemIndex]
    }

    label(i: number) {
        if (isNaN(i)) return 'Total'
        const labels = {
            0: 'Correct',
            1: 'Partially Correct',
            2: 'Wrong',
        }
        return labels[i]
    }

}
