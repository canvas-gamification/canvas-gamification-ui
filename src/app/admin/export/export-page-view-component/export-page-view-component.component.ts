import {Component} from '@angular/core'

@Component({
    selector: 'app-export-page-view-component',
    templateUrl: './export-page-view-component.component.html',
    styleUrls: ['./export-page-view-component.component.scss']
})
export class ExportPageViewComponentComponent {
    filters = [
        {
            key: 'time_created__gt',
            name: 'Viewed after',
            type: 'date',
        },
        {
            key: 'time_created__lt',
            name: 'Viewed before',
            type: 'date',
        },
        {
            key: 'user',
            name: 'User ID',
            type: 'number',
        },
        {
            key: 'user__role',
            name: 'User role',
            type: 'role',
        },
    ]
}
