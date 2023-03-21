import {Component, OnDestroy, OnInit} from '@angular/core'
import {CourseEvent} from "@app/_models"
import {UqjService} from "@app/problems/_services/uqj.service"
import {ActivatedRoute} from "@angular/router"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {Subscription} from "rxjs"

@Component({
    selector: 'app-event-question-view',
    templateUrl: './event-question-view.component.html',
    styleUrls: ['./event-question-view.component.scss']
})
export class EventQuestionViewComponent implements OnInit, OnDestroy {
    eventId: number
    event: CourseEvent
    uqjs: number[]
    currentQuestionId: number
    cursor = 0
    subscriptions: Subscription = new Subscription()

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

        this.subscriptions.add(this.route.paramMap.subscribe(paramMap => {
            this.uqjService.getUQJQuestionIds({question_event: this.eventId})
                .subscribe( uqjs => {
                    this.uqjs = uqjs
                    this.cursor = this.uqjs.indexOf(+paramMap.get('id'))

                    //not printing, but questions do change as desired
                    //issues:
                    // (1) url problem id does not change
                    // (2) breadcrumb question name not updated
                    console.log(+paramMap.get('id'))
                })
        }))
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
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
