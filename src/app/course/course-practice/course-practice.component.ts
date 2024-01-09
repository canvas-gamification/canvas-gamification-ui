import {Component, OnInit} from '@angular/core'
import {Course, User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"
import {CourseService} from "@app/course/_services/course.service"
import {ActivatedRoute} from "@angular/router"
import {ConceptViewService} from "@app/_services/concept-view.service"

@Component({
    selector: 'app-course-practice',
    templateUrl: './course-practice.component.html',
    styleUrls: ['./course-practice.component.scss']
})
export class CoursePracticeComponent implements OnInit {

    course: Course
    courseId: number
    user: User
    enableListView: boolean

    constructor(
        private authenticationService: AuthenticationService,
        private conceptViewService: ConceptViewService,
        private courseService: CourseService,
        private route: ActivatedRoute
    ) {
        this.courseId = this.route.snapshot.parent.params.courseId
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })
        this.enableListView = this.conceptViewService.getListView()
    }

    setListView(b: boolean) {
        this.enableListView = b
        this.conceptViewService.setListView(b)
    }
}
