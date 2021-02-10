import { Component, OnInit } from '@angular/core';
import {Course} from '@app/_models';
import {CourseService} from '@app/_services/api/course.service';

@Component({
  selector: 'app-inactive-courses',
  templateUrl: './inactive-courses.component.html',
  styleUrls: ['./inactive-courses.component.scss']
})
export class InactiveCoursesComponent implements OnInit {
  inactiveCourses: Course[];

  constructor( private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService
      .getCourses({status: 'inactive', registered: true})
      ?.subscribe((courses) => {
        this.inactiveCourses = courses.filter(course => {
          return course.status !== 'In Session';
        });
      });
  }
}
