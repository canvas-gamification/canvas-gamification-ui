import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {
    AgreeQuestion,
    agreeQuestions,
    CheckBoxQuestion,
    checkboxQuestions
} from "@app/accounts/survey/initial-survey/data"
import {SurveyService} from "@app/accounts/_services/survey.service"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"

@Component({
    selector: 'app-initial-survey',
    templateUrl: './initial-survey.component.html',
    styleUrls: ['./initial-survey.component.scss']
})
export class InitialSurveyComponent implements OnInit {

    formGroup = new FormGroup({
        two: new FormControl(null),
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
        private readonly notificationService: TuiNotificationsService
    ) {
    }

    ngOnInit(): void {
        this.agreeQuestions = agreeQuestions
        for (const agreeQuestion of agreeQuestions) {
            this.formGroup.addControl(agreeQuestion.code, new FormControl(null))
        }

        this.checkboxQuestions = checkboxQuestions
        for (const question of checkboxQuestions) {
            for (const choice of question.choices) {
                this.formGroup.addControl(choice, new FormControl(false))
            }
        }
    }

    submit() {
        this.surveyService.postSurvey('initial', this.formGroup.value).subscribe(() => {
            this.notificationService.show("Survey submitted successfully", {
                status: TuiNotification.Success,
            }).subscribe()
        })
    }
}
