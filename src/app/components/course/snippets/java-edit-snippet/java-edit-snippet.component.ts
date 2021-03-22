import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-java-edit-snippet',
  templateUrl: './java-edit-snippet.component.html',
  styleUrls: ['./java-edit-snippet.component.scss']
})
export class JavaEditSnippetComponent implements OnInit {
    @Input() JavaFormData;
    @Input() categories;
    @Input() courses;
    @Input() events;
    @Input() inputFileNames;

  constructor() { }

  ngOnInit(): void {
  }

    onSubmit(value) {}

    courseSelectedEvent($event: Event) {}
}
