import {Component} from '@angular/core'

@Component({
    selector: 'app-export-consent',
    templateUrl: './export-consent.component.html',
    styleUrls: ['./export-consent.component.scss']
})
export class ExportConsentComponent {
    filters = [
        {
            key: 'created_at__gt',
            name: 'Consented after',
            type: 'date',
        },
        {
            key: 'created_at__lt',
            name: 'Consented before',
            type: 'date',
        },
        {
            key: 'user__role',
            name: "Role",
            type: 'role',
        },
        {
            key: 'user',
            name: 'User ID',
            type: 'number',
        },
        {
            key: 'consent',
            name: 'Has consented?',
            type: 'boolean',
        },
        {
            key: 'access_submitted_course_work',
            name: 'Access submitted course work?',
            type: 'boolean',
        },
        {
            key: 'access_course_grades',
            name: 'Access course grades?',
            type: 'boolean',
        },
        {
            key: 'legal_first_name',
            name: 'Legal firstname',
            type: 'text',
        },
        {
            key: 'legal_last_name',
            name: 'Legal lastname',
            type: 'text',
        },
        {
            key: 'student_number',
            name: 'Student number',
            type: 'text',
        },
    ]

}
