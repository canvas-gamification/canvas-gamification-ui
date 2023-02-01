import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Question} from "@app/_models"
import {QuestionService} from "@app/problems/_services/question.service"

@Component({
    selector: 'app-problem-create',
    templateUrl: './problem-create-edit.component.html',
    styleUrls: ['./problem-create-edit.component.scss'],
})
export class ProblemCreateEditComponent implements OnInit {

    questionType: string
    questionDetails: Question
    eventId: number
    courseId: number

    constructor(
        private route: ActivatedRoute,
        private questionService: QuestionService,
    ) {
    }

    ngOnInit(): void {
        const questionId = this.route.snapshot.params.id
        this.eventId = +this.route.snapshot.params.eventId
        this.courseId = +this.route.snapshot.parent.params.courseId

        if (questionId) {
            this.questionService.getQuestion(questionId).subscribe(result => {
                this.questionDetails = result
                this.questionType = this.questionService.getQuestionType(result)
            })
        } else {
            this.route.params.subscribe(params => {
                this.questionType = params.type
            })
        }
    }
}
