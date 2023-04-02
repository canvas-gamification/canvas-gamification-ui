import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {
    agreeQuestions,
    checkboxQuestions
} from "@app/accounts/survey/initial-survey/data"
import {SurveyService} from "@app/accounts/_services/survey.service"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {Router} from "@angular/router"
import {AgreeQuestion, CheckBoxQuestion} from "@app/accounts/survey/types"

@Component({
    selector: 'app-initial-survey',
    templateUrl: './initial-survey.component.html',
    styleUrls: ['./initial-survey.component.scss']
})
export class InitialSurveyComponent implements OnInit {

    formGroup = new FormGroup({
        two: new FormControl(null, [Validators.required]),
        six: new FormControl(null),
    })
    agreeQuestions: AgreeQuestion[]
    checkboxQuestions: CheckBoxQuestion[]
    agreeTerms = [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree",
        "Not Applicable",
    ]

    twoItems = [
        "Always",
        "Most of the time",
        "Sometimes",
        "Rarely",
        "Never",
    ]

    constructor(
        private readonly surveyService: SurveyService,
        private readonly notificationService: TuiNotificationsService,
        private readonly router: Router,
    ) {
    }

    ngOnInit(): void {
        this.agreeQuestions = agreeQuestions
        for (const agreeQuestion of agreeQuestions) {
            this.formGroup.addControl(
                agreeQuestion.code,
                new FormControl(null, [Validators.required])
            )
        }

        this.checkboxQuestions = checkboxQuestions
        for (const question of checkboxQuestions) {
            for (const choice of question.choices) {
                this.formGroup.addControl(choice, new FormControl(false))
            }
        }
    }

    hasGoals() {
        return this.formGroup.get('two').value !== 'Never'
    }

    submit() {
        this.surveyService.postSurvey('initial', this.formGroup.value).subscribe(() => {
            this.notificationService.show("Survey submitted successfully", {
                status: TuiNotification.Success,
            }).subscribe()
            this.router.navigate(['homepage']).then()
        })
    }
}
