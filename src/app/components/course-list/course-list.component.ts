import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {CourseService} from '@app/_services/api/course.service';
import {ActivatedRoute} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements AfterViewInit {
  courseList: any;
  displayedColumns: string[] = ['id', 'name', 'status','is_registered', 'actions'];

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.courseList = [];
  }
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courseList = new MatTableDataSource(courses);
      this.courseList.sort = this.sort;
    });
  }

  hasViewPermission(courseId: number): boolean {
    // TODO: return user.is_teacher or self.is_instructor(user) or self.is_registered(user)
    return true;
  }


}
