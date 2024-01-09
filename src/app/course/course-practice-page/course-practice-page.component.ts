import {Component, OnInit} from '@angular/core'
import {Course, User} from '@app/_models'
import {CourseService} from "@app/course/_services/course.service"
import {ActivatedRoute} from "@angular/router"
import {AuthenticationService} from "@app/_services/api/authentication"
import {ConceptViewService} from "@app/_services/concept-view.service"

@Component({
    selector: 'app-course-practice-page',
    templateUrl: './course-practice-page.component.html',
    styleUrls: ['./course-practice-page.component.scss']
})
export class CoursePracticePageComponent implements OnInit {
    course: Course
    courseId: number
    user: User

    constructor(
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private courseService: CourseService,
        private conceptViewService: ConceptViewService
    ) {
        this.courseId = this.route.snapshot.parent.params.courseId
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })
    }

    isList() {
        return this.conceptViewService.getListView()
    }
}
