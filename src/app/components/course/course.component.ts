import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseService} from '@app/_services/api/course.service';
import {Course} from '@app/_models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  course: Course;
  courseId: number;

  constructor(private authenticationService: AuthenticationService,
              private courseService: CourseService,
              private route: ActivatedRoute) {
    this.courseId = this.route.snapshot.params.courseId;
  }

  ngOnInit(): void {
    this.courseService
      .getCourse(this.courseId, true, {ordering: {name: true}})
      ?.subscribe((course) => {
        this.course = course;
      });
  }

  isTeacher() {
    return true;
  }

}
