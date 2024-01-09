import {Component} from '@angular/core'

@Component({
    selector: 'app-export-survey',
    templateUrl: './export-survey.component.html',
    styleUrls: ['./export-survey.component.scss']
})
export class ExportSurveyComponent  {
    filters = [
        {
            key: 'time_created__gt',
            name: 'Submitted after',
            type: 'date',
        },
        {
            key: 'time_created__lt',
            name: 'Submitted before',
            type: 'date',
        },
        {
            key: 'code',
            name: "Type",
            type: "code",
        },
        {
            key: 'user__role',
            name: "Role",
            type: 'role',
        },
    ]
}
