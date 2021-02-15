import { Component, OnInit } from '@angular/core';
import {CanvasCourse} from "@app/_models";
import {CourseService} from "@app/_services/api/course.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  userId: number;
  courseList: CanvasCourse[];

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.courseList = [];
    this.userId = +this.route.snapshot.paramMap.get('userId');
  }

  ngOnInit(): void {
    this.courseService.getCourses(this.userId).subscribe((courses) =>
      {
        this.courseList = courses;
      });
  }

}
