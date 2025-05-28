import {Component, Inject, OnInit} from '@angular/core'
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
import {
    TuiDialogContext,
    TuiNotification,
    TuiNotificationsService,
    TuiDialogService
} from "@taiga-ui/core"
import {startCase} from "lodash"
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus"
import {orderUQJs} from "@app/course/_utils/orderUQJs"
import {ConceptViewService} from "@app/_services/concept-view.service"

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
    dropdownLink: string

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private uqjService: UqjService,
        private courseEventService: CourseEventService,
        private courseService: CourseService,
        private teamService: TeamService,
        private readonly notificationService: TuiNotificationsService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        private conceptViewService: ConceptViewService
    ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    init() {
        this.courseService.getCourse(this.courseId).subscribe(course => this.course = course)
        if (this.eventId && this.courseId) { // if this snippet is an event-view
            this.courseService.validateEvent(this.courseId, this.eventId).subscribe(response => {
                if (response.success) {
                    forkJoin({
                        event: this.courseEventService.getCourseEvent(this.eventId),
                        uqjs: this.uqjService.getUQJs({
                            filters: {
                                question_event: this.eventId
                            },
                            pageSize: 1000
                        }),
                    }).subscribe(result => {
                        this.event = result.event
                        this.uqjs = result.uqjs.results
                        this.uqjs = orderUQJs(this.uqjs)
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

    getMemberNames(names: string[]): string {
        return names.join(", ")
    }

    getBackLabel(): string {
        if (this.getEventType() === 'challenge')
            return 'List of Challenges'
        else if (this.getEventType() === 'assignment' || this.getEventType() === 'exam')
            return 'Assignments and Exams'
    }

    getChallengeType(): string {
        return startCase(this.event.challenge_type?.toLowerCase())
    }

    getEventTypeDescription(): string {
        switch (this.event.challenge_type) {
            case 'QUOTA':
                return 'Teams earn tokens from every question solved. Each member gets the number' +
                    ' of tokens equivalent to team tokens when the challenge ends.'
            case 'TOP_TEAMS':
                return `Teams earn tokens by staying on the top ${this.event.challenge_type_value}
                teams of this challenge. Each member gets the number of tokens equivalent to team
                tokens as the challenge ends.`
        }
    }

    /**
     * Opens the dialog service based on the template passed
     * @param content - the template to be used
     * @param openDialog - the boolean condition used to check if template should be opened
     * @param uqj - the question to be edited
     */
    openEditQuestionInEventDialog(
        content: PolymorpheusContent<TuiDialogContext>,
        openDialog: boolean,
        uqj: UQJ
    ): void {
        if (openDialog) {
            this.dialogService.open(content, {
                closeable: false,
                label: 'Edit question in finished assessment?'
            }).subscribe()
        } else {
            this.router.navigate(
                ['../', this.eventId, 'problem', uqj.question.id, 'edit']
                , {relativeTo: this.route}
            ).then()
        }
    }

    /**
     * Opens the dialog service based on the template passed
     * @param content - the template to be used
     * @param openDialog - the boolean condition used to check if template should be opened
     * @param link - the ending parameter of the routerlink
     */
    openNewQuestionInClosedEventDialog(
        content: PolymorpheusContent<TuiDialogContext>,
        openDialog: boolean,
        link: string
    ): void {
        if (openDialog) {
            this.dropdownLink = link
            this.dialogService.open(content, {
                closeable: false,
                label: 'Create new question in finished assessment?'
            }).subscribe()
        } else {
            this.router.navigate(
                ['../', this.eventId, 'problem', 'create', link]
                , {relativeTo: this.route}
            ).then()
        }
    }

    /**
     * Opens the dialog service based on the template passed
     * @param content - the template to be used
     * @param eventRemove - the event to be removed
     */
    openRemoveQuestionInEventDialog(
        content: PolymorpheusContent<TuiDialogContext>,
        eventRemove: CourseEvent
    ): void {
        let labelText = 'Remove question?'
        if (eventRemove.is_closed) {
            labelText = 'Remove question in finished assessment?'
        }
        this.dialogService.open(content, {
            closeable: false,
            label: labelText
        }).subscribe()
    }

    isList() {
        return this.conceptViewService.getListView()
    }
}
