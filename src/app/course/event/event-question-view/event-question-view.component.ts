import {Component, OnInit} from '@angular/core'
import {CourseEvent, UQJ} from "@app/_models"
import {UqjService} from "@app/problems/_services/uqj.service"
import {ActivatedRoute} from "@angular/router"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {orderUQJs} from "@app/course/_utils/orderUQJs"

@Component({
    selector: 'app-event-question-view',
    templateUrl: './event-question-view.component.html',
    styleUrls: ['./event-question-view.component.scss']
})
export class EventQuestionViewComponent implements OnInit {
    eventId: number
    event: CourseEvent
    uqjs: UQJ[]
    currentUJQ: UQJ
    reportQuestionModal = false
    currentQuestionId: number

    constructor(
        private uqjService: UqjService,
        private route: ActivatedRoute,
        private courseEventService: CourseEventService,
    ) {
    }

    ngOnInit(): void {
        this.eventId = +this.route.snapshot.paramMap.get('eventId')
        this.courseEventService.getCourseEvent(this.eventId).subscribe(
            event => this.event = event
        )

        this.uqjService.getUQJs({filters: {question_event: this.eventId}})
            .subscribe(result => {
                this.uqjs = orderUQJs(result.results)
                this.currentUJQ = this.uqjs.find( uqj =>
                    uqj.question.id === +this.route.snapshot.paramMap.get('id'))
            })
        this.currentQuestionId = this.currentUJQ.id
    }

    setCurrentUQJ(uqj: UQJ) {
        this.currentUJQ = uqj
    }

    isCurrentUQJ(uqj: UQJ): boolean {
        return this.currentUJQ === uqj
    }

    /**
     * Opens the report question modal
     */
    openReportQuestion() {
        this.reportQuestionModal = true
    }
}
