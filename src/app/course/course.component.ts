import {Component, OnInit} from '@angular/core'
import {AuthenticationService} from '@app/_services/api/authentication'
import {CourseService} from '@app/course/_services/course.service'
import {Course, CourseEvent, UQJ, User} from '@app/_models'
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    NavigationEnd,
    Router
} from '@angular/router'
import {filter} from "rxjs/operators"
import {UqjService} from "@app/problems/_services/uqj.service"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {Team} from "@app/_models/team"
import {TeamService} from "@app/course/_services/team.service"

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    course: Course
    courseId: number
    event: CourseEvent
    team: Team
    user: User
    uqjs: UQJ[]
    breadCrumbs: { caption: string, routerLink: string }[]
    displayDescription: boolean

    constructor(
        private authenticationService: AuthenticationService,
        private courseService: CourseService,
        private uqjService: UqjService,
        private courseEventService: CourseEventService,
        private teamService: TeamService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.courseId = this.route.snapshot.params.courseId
        this.authenticationService.currentUser
            .subscribe(user => this.user = user)
    }

    async fetchEvent(eventId: number) {
        this.event = await this.courseEventService.getCourseEvent(eventId).toPromise()
        this.uqjs = (await this.uqjService.getUQJs(
            {filters: {question_event: eventId}}
        ).toPromise()).results
    }

    async fetchTeam(teamId: number) {
        this.team = await this.teamService.getTeam(teamId).toPromise()
    }

    async getBreadCrumbs(route: ActivatedRouteSnapshot) {
        let breadCrumbs: { caption: string, routerLink: string }[]
        if (route.firstChild.data.breadCrumbs) {
            breadCrumbs = route.firstChild.data.breadCrumbs

            // Convert the params in the url manually
            breadCrumbs = breadCrumbs.map(breadCrumb => (
                {
                    ...breadCrumb,
                    routerLink: breadCrumb.routerLink
                        .replace(':courseId', String(this.courseId))
                        .replace(':goalId', route.firstChild.params.goalId)
                        .replace(':eventId', route.firstChild.params.eventId)
                        .replace(':id', route.firstChild.params.id)
                        .replace('teamId', route.firstChild.params.teamId)
                }
            ))

            // Replace :eventName in the breadcrumbs
            if (route.firstChild.params.eventId) {
                const eventId = route.firstChild.params.eventId
                if (this.event?.id !== eventId) {
                    await this.fetchEvent(eventId)
                }
                breadCrumbs = breadCrumbs.map(breadCrumb => ({
                    ...breadCrumb,
                    caption: breadCrumb.caption
                        .replace(':eventName', this.event.name),
                }))
            }

            // Replace :questionName in the breadCrumbs
            if (route.firstChild.params.id) {
                const questionId = +route.firstChild.params.id
                const uqj = this.uqjs.find(obj => obj.question.id === questionId)
                breadCrumbs = breadCrumbs.map(breadCrumb => ({
                    ...breadCrumb,
                    caption: breadCrumb.caption
                        .replace(':questionName', uqj.question.title),
                }))
            }

            // Replace :teamName in the breadcrumbs
            if (route.firstChild.params.teamId) {
                const teamId = route.firstChild.params.teamId
                await this.fetchTeam(teamId)
                breadCrumbs = breadCrumbs.map(breadCrumb => ({
                    ...breadCrumb,
                    caption: breadCrumb.caption
                        .replace(':teamName', this.team.name),
                }))
            }
        }
        this.breadCrumbs = breadCrumbs
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })

        this.getBreadCrumbs(this.route.snapshot).then()
        this.displayDescription = this.router.url.includes('/homepage')

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.breadCrumbs = null
                this.displayDescription = this.router.url.includes('/homepage')
                this.getBreadCrumbs(this.route.snapshot).then()
            })
    }
}
