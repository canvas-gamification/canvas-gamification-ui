import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-mcq-create-snippet',
    templateUrl: './mcq-create-snippet.component.html',
    styleUrls: ['./mcq-create-snippet.component.scss']
})
export class McqCreateSnippetComponent implements OnInit {
    @Input() MCQFormData;
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
