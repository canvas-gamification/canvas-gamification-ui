import {Component, Input, OnInit} from '@angular/core'
import {convert} from 'html-to-text'

@Component({
    selector: 'app-event-stats-bar-chart',
    templateUrl: './event-stats-bar-chart.component.html',
    styleUrls: ['./event-stats-bar-chart.component.scss']
})
export class EventStatsBarChartComponent implements OnInit {

    @Input() answers: Record<string, number>

    labelsX: string[]
    labelsY: string[]
    value: Array<number[]>

    ngOnInit(): void {
        this.labelsX = Object.keys(this.answers)
            .map(convert)
            .map((label: string) => label.length < 90 ? label : label.slice(0, 90) + '...')
        this.value = [Object.values(this.answers)]
        const max = this.getMax()
        this.labelsY = ["0", String(max / 2), String(max)]
    }

    getMax() {
        return Math.max(...this.value[0]) + 1
    }
}
