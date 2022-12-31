import {Component} from '@angular/core'
import {ActionStatus, ActionVerb, User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"
import {CourseService} from "@app/course/_services/course.service"
import {ActivatedRoute} from "@angular/router"
import {UserActionsService} from "@app/_services/api/user-actions.service"

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
        private route: ActivatedRoute,
        private userAction: UserActionsService
    ) {
        this.courseId = this.route.snapshot.parent.params.courseId
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    challengeClickLog(): void {
        this.userAction.createCustomAction({
            description: 'User selected challenges on the course homepage',
            status: ActionStatus.COMPLETE,
            verb: ActionVerb.OPENED,
        })
    }

    practiceClickLog(): void {
        this.userAction.createCustomAction({
            description: 'User selected practice on the course homepage',
            status: ActionStatus.COMPLETE,
            verb: ActionVerb.OPENED,
        })
    }

}
