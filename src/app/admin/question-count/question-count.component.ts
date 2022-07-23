import {AfterContentInit, ChangeDetectorRef, Component, OnInit} from '@angular/core'
import {QuestionCountService} from "@app/admin/_services/question-count.service"
import {QuestionCount} from "@app/_models"

@Component({
    selector: 'app-question-count',
    templateUrl: './question-count.component.html',
    styleUrls: ['./question-count.component.scss']
})
export class QuestionCountComponent implements OnInit, AfterContentInit {
    questionCountData!: QuestionCount[]
    questionCountDataHeader!: string[]
    openGraphDropdown!: boolean[]

    constructor(private questionCountService: QuestionCountService, private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.questionCountService.getQuestionCount().subscribe(questionCountData => {
            this.questionCountData = questionCountData
            this.questionCountDataHeader = Object.keys(questionCountData[0])
            this.openGraphDropdown = Array(questionCountData.length).fill(false)
        })
    }

    ngAfterContentInit(): void {
        this.changeDetector.detectChanges()
    }

    getCountPerDifficultyValues(questionCount: { count: number, difficulty: string }[]): number[] {
        return questionCount.map(questionCount => questionCount.count)
    }

    getDifficultyPerCountValue(index: number, questionCount: QuestionCount): string {
        return Number.isNaN(index) ? 'Questions' : questionCount.count_per_difficulty[index]?.difficulty
    }

    getDifficultyPerCountLabel(index: number, questionCount: QuestionCount): number {
        return Number.isNaN(index) ? questionCount.count : questionCount.count_per_difficulty[index]?.count
    }
}
