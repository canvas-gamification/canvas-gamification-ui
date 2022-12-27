import {Component, OnInit} from '@angular/core'
import {AuthenticationService} from '@app/_services/api/authentication'
import {CourseService} from '@app/course/_services/course.service'
import {Course, CourseEvent, Question, UQJ, User} from '@app/_models'
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    NavigationEnd,
    Router
} from '@angular/router'
import {filter} from "rxjs/operators"
import {UqjService} from "@app/problems/_services/uqj.service"
import {CourseEventService} from "@app/course/_services/course-event.service"

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    course: Course
    courseId: number
    question: Question
    questionId: number
    event: CourseEvent
    eventId: number
    user: User
    uqjs: UQJ[]
    breadCrumbs: { caption: string, routerLink: string }[]
    displayDescription: boolean

    constructor(
        private authenticationService: AuthenticationService,
        private courseService: CourseService,
        private uqjService: UqjService,
        private courseEventService: CourseEventService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.courseId = this.route.snapshot.params.courseId
        this.authenticationService.currentUser
            .subscribe(user => this.user = user)
    }

    async getBreadCrumbs(route: ActivatedRouteSnapshot) {
        let breadCrumbs: { caption: string, routerLink: string }[]
        if (route.firstChild.data.breadCrumbs) {
            breadCrumbs = route.firstChild.data.breadCrumbs
            breadCrumbs = breadCrumbs.map(breadCrumb => (
                {
                    ...breadCrumb,
                    routerLink: breadCrumb.routerLink
                        .replace(':courseId', String(this.courseId))
                        .replace(':goalId', route.firstChild.params.goalId)
                        .replace(':eventId', route.firstChild.params.eventId)
                        .replace(':id', route.firstChild.params.id)
                }
            ))
            if (route.firstChild.params.eventId) {
                const eventId = route.firstChild.params.eventId
                if (this.eventId != eventId) {
                    this.eventId = eventId
                    const v = await this.courseService
                        .validateEvent(this.courseId, eventId).toPromise()
                    if (!v.success)
                        return
                    const e = await this.courseEventService
                        .getCourseEvent(eventId).toPromise()
                    const u = await this.uqjService
                        .getUQJs(
                            {filters: {question_event: eventId}}
                        ).toPromise()
                    this.event = e
                    this.uqjs = u.results
                }
                if (route.firstChild.params.id) {
                    const questionId = route.firstChild.params.id
                    if (this.questionId != questionId) {
                        this.questionId = questionId
                        const uqj = this.uqjs.find(obj => {
                            return obj.question.id == questionId
                        })
                        this.question = uqj.question
                    }
                    breadCrumbs = breadCrumbs.map(breadCrumb => ({
                        ...breadCrumb,
                        caption: breadCrumb.caption
                            .replace(':questionName', this.question.title),
                    }))
                }
                breadCrumbs = breadCrumbs.map(breadCrumb => ({
                    ...breadCrumb,
                    caption: breadCrumb.caption
                        .replace(':eventName', this.event.name),
                }))
            }
        }
        this.breadCrumbs = breadCrumbs
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })
        this
            .getBreadCrumbs(this.route.snapshot).then()
        this
            .displayDescription = this.router.url.includes('/homepage')
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.breadCrumbs = null
                this.displayDescription = this.router.url.includes('/homepage')
                this.getBreadCrumbs(this.route.snapshot).then()
            })
    }
}
