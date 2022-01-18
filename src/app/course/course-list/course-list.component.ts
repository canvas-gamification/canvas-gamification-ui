import {Component, OnInit} from '@angular/core';
import {CourseService} from '@app/course/_services/course.service';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '@app/_services/api/authentication';
import {Course, STATUS, User} from '@app/_models';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
    STATUS = STATUS;
    allCourses!: Course[];
    user: User;
    courseNameSearch = '';

    readonly matchCourseName = (course: Course, search: string): boolean => {
        if (search !== '') return course.name.toLowerCase().includes(search.toLowerCase());
        else return true;
    }

    constructor(private authenticationService: AuthenticationService,
                private route: ActivatedRoute,
                private courseService: CourseService,) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        this.courseService.getCourses().subscribe((courses) => {
            this.allCourses = courses;
        });
    }
}
