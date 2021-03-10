import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent} from '@app/_models';
import {formatDate} from '@angular/common'

@Component({
  selector: 'app-course-events-snippet',
  templateUrl: './course-events-snippet.component.html',
  styleUrls: ['./course-events-snippet.component.scss']
})
export class CourseEventsSnippetComponent implements OnInit {
  @Input() events: CourseEvent[];

  request = {
    user: {
      isTeacher: true
    }
  };


  constructor() {
  }

  ngOnInit(): void {
    console.log(this.events);
  }

  getEventButtonText(event: CourseEvent): string {
    var strAppend = event.type.toLowerCase()
    strAppend = strAppend.charAt(0).toUpperCase() + strAppend.substr(1,strAppend.length)
    return 'Open ' + strAppend;
  }

  isExamAndOpen(event: CourseEvent): boolean {
    return event.is_open && event.is_exam;
  }

}
