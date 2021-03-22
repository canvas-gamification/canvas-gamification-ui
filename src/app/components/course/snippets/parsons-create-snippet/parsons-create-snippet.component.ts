import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-parsons-create-snippet',
    templateUrl: './parsons-create-snippet.component.html',
    styleUrls: ['./parsons-create-snippet.component.scss']
})
export class ParsonsCreateSnippetComponent implements OnInit {
    @Input() ParsonsFormData;
    @Input() categories;
    @Input() courses;
    @Input() events;

    constructor() {
    }

    ngOnInit(): void {
    }

    onSubmit(value) {

    }

    courseSelectedEvent($event: Event) {

    }
}
