import {Component, OnInit} from '@angular/core'
import {Course, CourseEvent, UQJ, User} from '@app/_models'
import {AuthenticationService} from '@app/_services/api/authentication'
import {ActivatedRoute, Router} from '@angular/router'
import {UqjService} from '@app/problems/_services/uqj.service'
import {forkJoin} from 'rxjs'
import {CourseEventService} from '@app/course/_services/course-event.service'
import {CourseService} from '@app/course/_services/course.service'
import {TuiStatusT} from "@taiga-ui/kit"
import {Team} from "@app/_models/team"
import {TeamService} from "@app/course/_services/team.service"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"

@Component({
    selector: 'app-course-question-snippet',
    templateUrl: './course-question-snippet.component.html',
    styleUrls: ['./course-question-snippet.component.scss']
})
export class CourseQuestionSnippetComponent implements OnInit {
    uqjs: UQJ[]
    user: User
    course: Course
    event: CourseEvent
    eventId: number
    courseId: number
    team: Team
    openNewQuestionDropdown = false

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private uqjService: UqjService,
        private courseEventService: CourseEventService,
        private courseService: CourseService,
        private teamService: TeamService,
        private readonly notificationService: TuiNotificationsService,
    ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    orderQuestions(): void {
        this.uqjs.sort((a, b) =>
            a.question.title.localeCompare(b.question.title))
    }

    init() {
        this.courseService.getCourse(this.courseId).subscribe(course => this.course = course)
        if (this.eventId && this.courseId) { // if this snippet is an event-view
            this.courseService.validateEvent(this.courseId, this.eventId).subscribe(response => {
                if (response.success) {
                    forkJoin({
                        event: this.courseEventService.getCourseEvent(this.eventId),
                        uqjs: this.uqjService.getUQJs({filters: {question_event: this.eventId}}),
                    }).subscribe(result => {
                        this.event = result.event
                        this.uqjs = result.uqjs.results
                        this.orderQuestions()
                    })
                } else {
                    this.router.navigate(['course/view', this.courseId]).then()
                }
            })
        }
        this.teamService.getMyTeam(this.eventId).subscribe(team => this.team = team)
    }

    ngOnInit(): void {
        this.courseId = +this.route.snapshot.parent.paramMap.get('courseId') || null
        this.eventId = +this.route.snapshot.paramMap.get('eventId') || null
        this.init()
    }

    /**
     * Returns the status text based on the UQJ object passed
     * @param uqj - the UQJ object to be checked
     */
    getStatus(uqj: UQJ): string {
        // If the event exists, or if it is a non event, return default status text
        if (!uqj.question.event || !uqj.question.is_exam) {
            return uqj.status
        }

        if (uqj.question.is_exam && uqj.num_attempts > 0) {
            return 'Submitted'
        } else if (uqj.question.is_exam) {
            return 'Not Submitted'
        }
    }

    /**
     * Return the CSS class corresponding to the completion status of the UQJ
     * @param status - the status text to be checked
     */
    highlight(status: string): TuiStatusT {
        if (status.localeCompare('Solved') === 0) {
            return 'success'
        } else if (status.localeCompare('Partially Solved') === 0) {
            return 'warning'
        } else if (status.localeCompare('Wrong') === 0) {
            return 'error'
        }
        return 'warning'
    }

    getEventType(): string {
        return this.event.type.toLowerCase()
    }

    removeQuestion(questionId: number) {
        this.courseEventService.removeQuestion(this.eventId, questionId).subscribe(() => {
            this.notificationService.show("Question removed successfully", {
                status: TuiNotification.Success,
            }).subscribe()
            this.init()
        })
    }

    getBackLabel(): string {
        if (this.getEventType() === 'challenge')
            return 'List of Challenges'
        else if (this.getEventType() === 'assignment' || this.getEventType() === 'exam')
            return 'Assignments and Exams'
    }
}
