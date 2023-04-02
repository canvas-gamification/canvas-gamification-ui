import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from "@angular/forms"
import {AgreeQuestion, SelectQuestion} from "@app/accounts/survey/types"
import {
    S1AgreeQuestions,
    S1SelectQuestions,
    S2AgreeQuestions,
    S3AgreeQuestions
} from "@app/accounts/survey/final-survey/data"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {SurveyService} from "@app/accounts/_services/survey.service"
import {Router} from "@angular/router"

@Component({
    selector: 'app-final-survey',
    templateUrl: './final-survey.component.html',
    styleUrls: ['./final-survey.component.scss']
})
export class FinalSurveyComponent implements OnInit {
    formGroup = new FormGroup({
        "S2-1": new FormControl(null),
        "S2-3": new FormControl(null),
        "S2-4": new FormControl(null),
        "S2-5": new FormControl(null),
        "S3-1": new FormControl(null),
        "S4-1": new FormControl(null),
    })

    s1SelectQuestions: SelectQuestion[]
    s1AgreeQuestions: AgreeQuestion[]
    s2AgreeQuestions: AgreeQuestion[]
    s3AgreeQuestions: AgreeQuestion[]


    agreeTerms = [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree",
        "Not Applicable",
    ]

    s2Q1Items = [
        "Yes, but only a few times",
        "Yes, I used it often",
        "No, I couldn't figure out how to use it",
        "No, I didn't have time or didn't want to do it",
    ]

    s2Q4Items = [
        "I didn't know about it",
        "I didn't have time",
        "I don't want to do optional work",
        "I didn't know how to use it",
        "I just didn't want to",
        "I didn't use the website much",
        "The website was too hard to use",
        "I didn't understand the purpose of goals",
        "Others",
    ]

    s3Q1Items = [
        "Yes, very often",
        "Yes, only sometimes",
        "No",
    ]

    screen = 3

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
                new FormControl(null)
            )
        }

        this.s2AgreeQuestions = S2AgreeQuestions
        for (const agreeQuestion of S2AgreeQuestions) {
            this.formGroup.addControl(
                agreeQuestion.code,
                new FormControl(null)
            )
        }

        this.s3AgreeQuestions = S3AgreeQuestions
        for (const agreeQuestion of S3AgreeQuestions) {
            this.formGroup.addControl(
                agreeQuestion.code,
                new FormControl(null)
            )
        }

        this.s1SelectQuestions = S1SelectQuestions
        for (const question of S1SelectQuestions) {
            this.formGroup.addControl(question.code, new FormControl(''))
        }
    }

    hasGoals() {
        const value = this.formGroup.get('S2-1').value
        return !value || value.startsWith("Yes")
    }

    hasLeaderboard() {
        const value = this.formGroup.get('S3-1').value
        return !value || value.startsWith("Yes")
    }

    nextScreen() {
        this.screen += 1
        window.scroll(0, 0)
    }

    finalScreen() {
        return this.screen === 5
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
