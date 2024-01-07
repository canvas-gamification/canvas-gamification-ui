import {Component, Input} from '@angular/core'
import {GradeBook} from "@app/_models/grade_book"

@Component({
    selector: 'app-token-overview',
    templateUrl: './token-overview.component.html',
    styleUrls: ['./token-overview.component.scss']
})
export class TokenOverviewComponent {
    @Input() displayData: GradeBook
    tableHeaders: string[] = [
        'name', 'event_name', 'grade'
    ]
}
