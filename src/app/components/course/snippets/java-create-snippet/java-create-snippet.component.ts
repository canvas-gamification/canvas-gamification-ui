import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-java-create-snippet',
    templateUrl: './java-create-snippet.component.html',
    styleUrls: ['./java-create-snippet.component.scss']
})
export class JavaCreateSnippetComponent implements OnInit {
    @Input() JavaFormData;
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
