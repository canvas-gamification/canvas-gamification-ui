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
    currentQuestionId: number
    cursor = 0

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

        this.route.paramMap.subscribe(paramMap => {
            this.uqjService.getUQJs({filters: {question_event: this.eventId}})
                .subscribe( result => {
                    this.uqjs = result.results
                    this.uqjs = orderUQJs(this.uqjs)
                    this.cursor = this.uqjs.map(uqj => uqj.question.id).indexOf(+paramMap.get('id'))
                    this.updateCurrentQuestion()
                })
        })
    }

    prevQuestion(): void {
        this.cursor = (this.cursor + this.uqjs.length - 1) % this.uqjs.length
        this.updateCurrentQuestion()
    }

    nextQuestion(): void {
        this.cursor = (this.cursor + 1) % this.uqjs.length
        this.updateCurrentQuestion()
    }

    updateCurrentQuestion(): void {
        this.currentQuestionId = this.uqjs.map(uqj => uqj.question.id)[this.cursor]
    }

}
