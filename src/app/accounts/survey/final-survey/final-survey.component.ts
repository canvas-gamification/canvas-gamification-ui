import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {AgreeQuestion, SelectQuestion} from "@app/accounts/survey/types"
import {S1AgreeQuestions, S1SelectQuestions} from "@app/accounts/survey/final-survey/data"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {SurveyService} from "@app/accounts/_services/survey.service"
import {Router} from "@angular/router"

@Component({
    selector: 'app-final-survey',
    templateUrl: './final-survey.component.html',
    styleUrls: ['./final-survey.component.scss']
})
export class FinalSurveyComponent implements OnInit {
    formGroup = new FormGroup({})

    s1SelectQuestions: SelectQuestion[]
    s1AgreeQuestions: AgreeQuestion[]

    agreeTerms = [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree",
        "Not Applicable",
    ]

    constructor(
        private surveyService: SurveyService,
        private notificationService: TuiNotificationsService,
        private router: Router
    ) {
    }
    ngOnInit(): void {
        this.s1AgreeQuestions = S1AgreeQuestions
        for (const agreeQuestion of S1AgreeQuestions) {
            this.formGroup.addControl(
                agreeQuestion.code,
                new FormControl(null, [Validators.required])
            )
        }

        this.s1SelectQuestions = S1SelectQuestions
        for (const question of S1SelectQuestions) {
            this.formGroup.addControl(question.code, new FormControl('', [Validators.required]))
        }
    }

    submit() {
        this.surveyService.postSurvey('final', this.formGroup.value).subscribe(() => {
            this.notificationService.show("Survey submitted successfully", {
                status: TuiNotification.Success,
            }).subscribe()
            this.router.navigate(['homepage']).then()
        })
    }
}
