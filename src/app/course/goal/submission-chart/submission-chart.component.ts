import {Component, Input} from '@angular/core'
import {GoalItemSubmissionStats} from "@app/_models/goal/goal"
import {TuiBaseColor} from "@taiga-ui/core"

@Component({
    selector: 'app-submission-chart',
    templateUrl: './submission-chart.component.html',
    styleUrls: ['./submission-chart.component.scss']
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

    color(i: number) {
        const colors = {
            0: TuiBaseColor.Success,
            1: TuiBaseColor.Primary,
            2: TuiBaseColor.Error,
        }
        return colors[i]
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
