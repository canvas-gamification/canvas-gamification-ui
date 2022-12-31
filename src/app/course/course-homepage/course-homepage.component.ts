import {Component} from '@angular/core'
import {ActionStatus, ActionType, ActionVerb, User} from "@app/_models"
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

    assignmentsAndExamsClickLog(): void {
        this.userAction.createCustomAction({
            description: 'User selected assignments and exams on the course homepage',
            object_type: ActionType.BUTTON,
            status: ActionStatus.COMPLETE,
            verb: ActionVerb.CLICKED,
            data: {
                page_url: '/course/:courseId/homepage',
                page_url_params: {
                    courseId: this.courseId
                },
                redirect_url: '/course/:courseId/assignments-exams',
                redirect_url_params: {
                    courseId: this.courseId
                }
            }
        }).subscribe()
    }

    challengeClickLog(): void {
        this.userAction.createCustomAction({
            description: 'User selected challenges on the course homepage',
            object_type: ActionType.BUTTON,
            status: ActionStatus.COMPLETE,
            verb: ActionVerb.CLICKED,
            data: {
                page_url: '/course/:courseId/homepage',
                page_url_params: {
                    courseId: this.courseId
                },
                redirect_url: '/course/:courseId/challenge',
                redirect_url_params: {
                    courseId: this.courseId
                }
            }
        }).subscribe()
    }

    leaderboardClickLog(): void {
        this.userAction.createCustomAction({
            description: 'User selected leaderboard on the course homepage',
            object_type: ActionType.BUTTON,
            status: ActionStatus.COMPLETE,
            verb: ActionVerb.CLICKED,
            data: {
                page_url: '/course/:courseId/homepage',
                page_url_params: {
                    courseId: this.courseId
                },
                redirect_url: '/course/:courseId/leaderboard',
                redirect_url_params: {
                    courseId: this.courseId
                }
            }
        }).subscribe()
    }

    practiceClickLog(): void {
        this.userAction.createCustomAction({
            description: 'User selected practice on the course homepage',
            object_type: ActionType.BUTTON,
            status: ActionStatus.COMPLETE,
            verb: ActionVerb.CLICKED,
            data: {
                page_url: '/course/:courseId/homepage',
                page_url_params: {
                    courseId: this.courseId
                },
                redirect_url: '/course/:courseId/practice',
                redirect_url_params: {
                    courseId: this.courseId
                }
            }
        }).subscribe()
    }

    tokenClickLog(): void {
        this.userAction.createCustomAction({
            description: 'User selected tokens on the course homepage',
            object_type: ActionType.BUTTON,
            status: ActionStatus.COMPLETE,
            verb: ActionVerb.CLICKED,
            data: {
                page_url: '/course/:courseId/homepage',
                page_url_params: {
                    courseId: this.courseId
                },
                redirect_url: '/course/:courseId/tokens',
                redirect_url_params: {
                    courseId: this.courseId
                }
            }
        }).subscribe()
    }

}
