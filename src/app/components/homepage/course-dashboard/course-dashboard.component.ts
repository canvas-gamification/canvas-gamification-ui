import { Component, OnInit } from '@angular/core';
import {CourseService} from '@app/_services/api/course.service';
import {Course} from '@app/_models';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.scss']
})
export class CourseDashboardComponent implements OnInit {
  activeCourses: Course[];

  constructor( private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService
      .getCourses({status: 'active', registered: true})
      ?.subscribe((courses) => {
        this.activeCourses = courses.filter(course => {
          return course.status === 'In Session';
        });
      });
  }
}
