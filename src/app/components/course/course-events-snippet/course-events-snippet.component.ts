import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-events-snippet',
  templateUrl: './course-events-snippet.component.html',
  styleUrls: ['./course-events-snippet.component.scss']
})
export class CourseEventsSnippetComponent implements OnInit {

  events = [
    {
      name: "ev1",
      startDate: 1204,
      endDate: 1819,
      isExamAndOpen: true,
      allowedToOpen: true,
      eventBtnText: "buttonTxt1",
      allowedToEdit: true
    },
    {
      name: "ev2",
      startDate: 2000,
      endDate: 2020,
      isExamAndOpen: true,
      allowedToOpen: true,
      eventBtnText: "buttonTxt1",
      allowedToEdit: true
    }
  ]
  request= {
    user: {
      isTeacher: true
    }
  }


  constructor() { }

  ngOnInit(): void {
  }

}
