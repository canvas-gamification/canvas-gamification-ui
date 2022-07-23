import {Component, OnInit} from '@angular/core'
import {SampleQuestionService} from '@app/_services/api/sample-question.service'
import {MultipleChoiceQuestion} from '@app/_models'

@Component({
    selector: 'app-sample-questions',
    templateUrl: './sample-questions.component.html',
    styleUrls: ['./sample-questions.component.scss']
})
export class SampleQuestionsComponent implements OnInit {

    multipleChoiceQuestions: MultipleChoiceQuestion[]

    constructor(private questionService: SampleQuestionService) {
    }

    ngOnInit(): void {
        this.questionService.getSampleMultipleChoiceQuestions().subscribe(questions => this.multipleChoiceQuestions = questions)
    }

}
