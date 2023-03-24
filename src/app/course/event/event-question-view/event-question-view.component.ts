import {Component, OnInit} from '@angular/core'
import {CourseEvent} from "@app/_models"
import {UqjService} from "@app/problems/_services/uqj.service"
import {ActivatedRoute, Router} from "@angular/router"
import {CourseEventService} from "@app/course/_services/course-event.service"

@Component({
    selector: 'app-event-question-view',
    templateUrl: './event-question-view.component.html',
    styleUrls: ['./event-question-view.component.scss']
})
export class EventQuestionViewComponent implements OnInit {
    eventId: number
    event: CourseEvent
    questionIds: number[]
    currentQuestionId: number
    cursor = 0

    constructor(
        private uqjService: UqjService,
        private route: ActivatedRoute,
        private courseEventService: CourseEventService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.eventId = +this.route.snapshot.paramMap.get('eventId')
        this.courseEventService.getCourseEvent(this.eventId).subscribe(
            event => this.event = event
        )

        this.route.paramMap.subscribe(paramMap => {
            this.uqjService.getUQJQuestionIds({question_event: this.eventId})
                .subscribe( uqjs => {
                    this.questionIds = uqjs
                    this.cursor = this.questionIds.indexOf(+paramMap.get('id'))
                })
        })
    }

    prevQuestion(): void {
        this.cursor = (this.cursor + this.questionIds.length - 1) % this.questionIds.length
        this.updateCurrentQuestion()
    }

    nextQuestion(): void {
        this.cursor = (this.cursor + 1) % this.questionIds.length
        this.updateCurrentQuestion()
    }

    updateCurrentQuestion(): void {
        this.currentQuestionId = this.questionIds[this.cursor]
        this.router.navigate(['..', this.questionIds[this.cursor]], {relativeTo: this.route})
    }

}
