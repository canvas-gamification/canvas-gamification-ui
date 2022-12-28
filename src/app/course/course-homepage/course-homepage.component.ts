import {Component} from '@angular/core'
import {User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"
import {CourseService} from "@app/course/_services/course.service"
import {ActivatedRoute} from "@angular/router"

@Component({
    selector: 'app-course-homepage',
    templateUrl: './course-homepage.component.html',
    styleUrls: ['./course-homepage.component.scss']
})
export class CourseHomepageComponent {
    courseId: number
    user: User

    constructor(
        private authenticationService: AuthenticationService,
        private courseService: CourseService,
        private route: ActivatedRoute
    ) {
        this.courseId = this.route.snapshot.parent.params.courseId
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }
}
