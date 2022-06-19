import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-problem-report-modal',
    templateUrl: './problem-report-modal.component.html',
    styleUrls: ['./problem-report-modal.component.scss']
})
export class ProblemReportModalComponent {
    @Input() open = false;
    @Output() readonly openChange = new EventEmitter<boolean>();

    @Input() questionId: number;

    submitReport() {
        console.debug(this.questionId);

        this.open = false;
        this.openChange.emit(this.open);
    }
}
