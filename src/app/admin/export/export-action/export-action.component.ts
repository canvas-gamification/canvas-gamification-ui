import {Component} from '@angular/core'

@Component({
    selector: 'app-export-action',
    templateUrl: './export-action.component.html',
    styleUrls: ['./export-action.component.scss']
})
export class ExportActionComponent {
    fields = [
        'time_created',
        'time_modified',
        'actor',
        'description',
        'token_change',
        'status',
        'verb',
        'object_type',
        'object_id',
        'data'
    ]
    filters = [
        {
            key: 'time_created__gt',
            name: 'Acted after',
            type: 'date',
        },
        {
            key: 'time_created__lt',
            name: 'Acted before',
            type: 'date',
        },
        {
            key: 'actor',
            name: 'Actor user ID',
            type: 'number',
        },
        {
            key: 'actor__role',
            name: 'Actor role',
            type: 'role',
        },
        {
            key: 'verb',
            name: 'Verb of the action',
            type: 'verb',
        },
        {
            key: 'object_type',
            name: 'Type of the object',
            type: 'objectType',
        },
        {
            key: 'object_id',
            name: 'Object ID',
            type: 'number',
        }
    ]
}
