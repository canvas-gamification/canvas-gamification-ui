import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-parsons-edit-snippet',
    templateUrl: './parsons-edit-snippet.component.html',
    styleUrls: ['./parsons-edit-snippet.component.scss']
})
export class ParsonsEditSnippetComponent implements OnInit {
    @Input() ParsonsFormData;
    @Input() categories;
    @Input() courses;
    @Input() events;


    constructor() {
    }

    ngOnInit(): void {
    }

    courseSelectedEvent($event: Event) {

    }

    onSubmit(value) {

    }
}
