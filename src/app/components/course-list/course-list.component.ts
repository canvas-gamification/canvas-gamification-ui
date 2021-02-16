import {Component, OnInit} from '@angular/core';
import {Course} from '@app/_models';
import {CourseService} from '@app/_services/api/course.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courseList: Course[];

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.courseList = [];
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courseList = courses;
    });
  }

  hasViewPermission(courseId: number): boolean {
    // TODO: return user.is_teacher or self.is_instructor(user) or self.is_registered(user)
    return true;
  }


}
