import {TuiNotificationService} from "@taiga-ui/core"
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core'
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms'
import {
    agreeQuestions,
    checkboxQuestions
} from "@app/accounts/survey/initial-survey/data"
import {SurveyService} from "@app/accounts/_services/survey.service"
import {Router} from "@angular/router"
import {AgreeQuestion, CheckBoxQuestion} from "@app/accounts/survey/types"

@Component({
    selector: 'app-initial-survey',
    templateUrl: './initial-survey.component.html',
    styleUrls: ['./initial-survey.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class InitialSurveyComponent implements OnInit {

    formGroup = new UntypedFormGroup({
        two: new UntypedFormControl(null, [Validators.required]),
        six: new UntypedFormControl(null),
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
        private readonly notificationService: TuiNotificationService,
        private readonly router: Router,
    ) {
    }

    ngOnInit(): void {
        this.agreeQuestions = agreeQuestions
        for (const agreeQuestion of agreeQuestions) {
            this.formGroup.addControl(
                agreeQuestion.code,
                new UntypedFormControl(null, [Validators.required])
            )
        }

        this.checkboxQuestions = checkboxQuestions
        for (const question of checkboxQuestions) {
            for (const choice of question.choices) {
                this.formGroup.addControl(choice, new UntypedFormControl(false))
            }
        }
    }

    hasGoals() {
        return this.formGroup.get('two').value !== 'Never'
    }

    submit() {
        this.surveyService.postSurvey('initial', this.formGroup.value).subscribe(() => {
            this.notificationService.open("Survey submitted successfully", {
                appearance: 'success',
            }).subscribe()
            this.router.navigate(['homepage']).then()
        })
    }
}
