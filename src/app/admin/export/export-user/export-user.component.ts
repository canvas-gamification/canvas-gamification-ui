import {Component} from '@angular/core'

@Component({
    selector: 'app-export-user',
    templateUrl: './export-user.component.html',
    styleUrls: ['./export-user.component.scss']
})
export class ExportUserComponent {

    filters = [
        {
            key: 'date_joined__gt',
            name: 'Joined after',
            type: 'date',
        },
        {
            key: 'date_joined__lt',
            name: 'Joined before',
            type: 'date',
        },
        {
            key: 'role',
            name: "Role",
            type: 'role',
        },
        {
            key: 'email',
            name: 'User Email',
            type: 'text',
        },
        {
            key: 'first_name',
            name: 'First name',
            type: 'text',
        },
        {
            key: 'last_name',
            name: 'Last name',
            type: 'text',
        },
    ]

}
