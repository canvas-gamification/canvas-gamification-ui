import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseService} from '@app/_services/api/course.service';
import {Course} from '@app/_models';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  // course = {
  //   id: 1,
  //   mock: true,
  //   name: 'Test',
  //   url: 'http://something.com',
  //   course_id: 1,
  //   token: 'somethingRandom',
  //   allow_registration: true,
  //   visible_to_students: true,
  //   start_date: '2020-09-21T18:27:15-07:00',
  //   end_date: '2021-07-15T18:27:17-07:00',
  //   instructor: 2,
  //   status: 'In Session',
  //   is_registered: true
  // };
  course: Course;

  constructor(private authenticationService: AuthenticationService, private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.courseService
      .getCourse(2, true, {ordering: {name: true}})
      ?.subscribe((course) => {
        this.course = course;
      });
  }

  isTeacher() {
    return true;
  }

}
