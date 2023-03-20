import {Component, OnInit} from '@angular/core'
import {CourseEvent} from "@app/_models"
import {UqjService} from "@app/problems/_services/uqj.service"
import {ActivatedRoute} from "@angular/router"
import {CourseEventService} from "@app/course/_services/course-event.service"

@Component({
    selector: 'app-event-question-view',
    templateUrl: './event-question-view.component.html',
    styleUrls: ['./event-question-view.component.scss']
})
export class EventQuestionViewComponent implements OnInit {
    eventId: number
    event: CourseEvent
    uqjs: number[]
    currentQuestionId: number
    cursor: number

    constructor(
        private uqjService: UqjService,
        private route: ActivatedRoute,
        private courseEventService: CourseEventService,
    ) {
    }

    ngOnInit() : void {
        this.eventId = +this.route.snapshot.paramMap.get('eventId')
        this.courseEventService.getCourseEvent(this.eventId).subscribe(
            event => this.event = event
        )
        // this.uqjService.getUQJs({filters: {question_event: this.eventId}}).subscribe(
        //     uqjs => this.uqjs = uqjs.results
        // )
        this.uqjService.getUQJQuestionIds({question_event: this.eventId}).subscribe(
            // uqjs => this.uqjs = uqjs
            uqjs => {
                this.uqjs = uqjs
                console.log(uqjs)
            }
        )
        this.cursor = 0
    }

    prevQuestion(): void {
        this.cursor = (this.cursor - 1) % this.uqjs.length
        this.updateCurrentQuestion()
    }

    nextQuestion(): void {
        this.cursor = (this.cursor + 1) % this.uqjs.length
        this.updateCurrentQuestion()
    }

    updateCurrentQuestion(): void {
        this.currentQuestionId = this.uqjs[this.cursor]
    }

}
