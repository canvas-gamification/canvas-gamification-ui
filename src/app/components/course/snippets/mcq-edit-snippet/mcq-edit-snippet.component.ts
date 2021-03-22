import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-mcq-edit-snippet',
    templateUrl: './mcq-edit-snippet.component.html',
    styleUrls: ['./mcq-edit-snippet.component.scss']
})
export class McqEditSnippetComponent implements OnInit {
    @Input() MCQFormData;
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
