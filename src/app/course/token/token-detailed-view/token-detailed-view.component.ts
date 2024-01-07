import {Component, Input} from '@angular/core'
import {GradeBook} from "@app/_models/grade_book"

@Component({
    selector: 'app-token-detailed-view',
    templateUrl: './token-detailed-view.component.html',
    styleUrls: ['./token-detailed-view.component.scss']
})
export class TokenDetailedViewComponent {
    @Input() displayData: GradeBook
    tableHeaders: string[] = [
        'name', 'event_name', 'grade', 'title', 'question_grade', 'attempts'
    ]
}
