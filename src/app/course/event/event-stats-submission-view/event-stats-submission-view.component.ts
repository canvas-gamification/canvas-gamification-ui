import {Component, Input, OnInit} from '@angular/core'
import {ApiService} from "@app/_services/api.service"
import {FormControl, FormGroup} from "@angular/forms"
import {EventStatsSubmissionDetail} from "@app/_models/event/event_stats_submission_detail"

@Component({
    selector: 'app-event-stats-submission-view',
    templateUrl: './event-stats-submission-view.component.html',
    styleUrls: ['./event-stats-submission-view.component.scss']
})
export class EventStatsSubmissionViewComponent implements OnInit {

    @Input() submissions: EventStatsSubmissionDetail
    filteredSubmissions: EventStatsSubmissionDetail
    index = 0
    showName = false
    showGrade = false
    answerFiles: { name: string, code: string }[] = []

    form = new FormGroup({
        names: new FormControl(this.showName),
        grades: new FormControl(this.showGrade),
    })
    formGroup = new FormGroup({
        status: new FormControl()
    })

    constructor(
        private apiService: ApiService
    ) {
    }

    ngOnInit(): void {
        this.filteredSubmissions = this.submissions
        this.answerFiles =
            this.processAnswerFiles(this.filteredSubmissions[this.index].answer_files)
    }

    processAnswerFiles(answerFiles) {
        return Object.entries(answerFiles)
            .reduce((prev, [key, value]) => {
                return [...prev, {
                    name: key,
                    code: value
                }]
            }, [])
    }

    goToPage(index: number): void {
        this.answerFiles = this.processAnswerFiles(this.filteredSubmissions[index].answer_files)
        this.index = index
    }

    submit() {
        this.showName = this.form.value.names
        this.showGrade = this.form.value.grades
    }

    filter(status) {
        this.filteredSubmissions = status === "All" ? this.submissions : this.submissions.filter(
            submission => submission.status === status
        )
        this.goToPage(0)
    }
}
