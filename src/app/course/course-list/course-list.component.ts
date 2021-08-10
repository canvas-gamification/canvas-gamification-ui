import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CourseService} from '@app/course/_services/course.service';
import {ActivatedRoute} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AuthenticationService} from '@app/_services/api/authentication';
import {Course, User} from '@app/_models';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements AfterViewInit {
    courseList: MatTableDataSource<Course>;
    allCourses: Course[];
    displayedColumns: string[] = ['id', 'name', 'status', 'is_registered', 'actions'];
    user: User;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private authenticationService: AuthenticationService,
                private route: ActivatedRoute,
                private courseService: CourseService,) {
        this.courseList = new MatTableDataSource();
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngAfterViewInit(): void {
        this.courseService.getCourses().subscribe((courses) => {
            this.allCourses = courses;
            this.courseList = new MatTableDataSource(courses);
            this.courseList.sort = this.sort;
        });
    }

    hasViewPermission(courseId: number): boolean {
        return this.user.is_teacher || !!this.allCourses.find(course => course.id === courseId)?.is_registered;
    }

    hasDashboardPermission(courseId: number): boolean {
        return this.user.is_teacher && this.allCourses.find(course => course.id === courseId)?.is_registered;
    }
}
