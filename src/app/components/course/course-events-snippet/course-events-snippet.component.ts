import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent} from '@app/_models';

@Component({
  selector: 'app-course-events-snippet',
  templateUrl: './course-events-snippet.component.html',
  styleUrls: ['./course-events-snippet.component.scss']
})
export class CourseEventsSnippetComponent implements OnInit {
  @Input() events: CourseEvent[];

  // I am unhappy with this solution: discuss more intelligent ways of doing this
  formatDate = function(date: string){ 
    return date.substr(0,10)
  }

  // events = [
  //   {
  //     name: "ev1",
  //     startDate: 1204,
  //     endDate: 1819,
  //     isExamAndOpen: true,
  //     allowedToOpen: true,
  //     eventBtnText: "buttonTxt1",
  //     allowedToEdit: true
  //   },
  //   {
  //     name: "ev2",
  //     startDate: 2000,
  //     endDate: 2020,
  //     isExamAndOpen: true,
  //     allowedToOpen: true,
  //     eventBtnText: "buttonTxt1",
  //     allowedToEdit: true
  //   }
  // ]

  request = {
    user: {
      isTeacher: true
    }
  };


  constructor() {
  }

  ngOnInit(): void {
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
