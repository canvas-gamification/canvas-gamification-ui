import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from "@angular/forms"
import {AgreeQuestion, SelectQuestion} from "@app/accounts/survey/types"
import {
    S1AgreeQuestions,
    S1SelectQuestions,
    S2AgreeQuestions,
    S3AgreeQuestions, S4AgreeQuestions
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
        "S4-2": new FormControl(null),
        "S4-3": new FormControl(null),
        "S4-4": new FormControl(null),
        "S4-5": new FormControl(null),
        "S4-6": new FormControl(null),
        "S4-7": new FormControl(null),
        "S4-8": new FormControl(null),
        "S5-1": new FormControl(null),
        "S5-2": new FormControl(null),
    })

    s1SelectQuestions: SelectQuestion[]
    s1AgreeQuestions: AgreeQuestion[]
    s2AgreeQuestions: AgreeQuestion[]
    s3AgreeQuestions: AgreeQuestion[]
    s4AgreeQuestions: AgreeQuestion[]


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

    s4Q1Items = [
        "Strongly agree",
        "Agree",
        "Neutral",
        "Disagree",
        "Strongly disagree",
    ]

    s4Q2Items = [
        '0',
        '1',
        '2',
        '3',
        '4+',
    ]

    s4Q3Items = [
        "I didn't know about them",
        "I didn't have time",
        "I don't want to do optional work",
        "I couldn't find anyone to work with",
        "I just didn't want to",
        "I didn't use the website much",
        "The website was too hard to use",
        "I didn't understand the purpose of challenges",
        "Other",
    ]

    s4Q5Items = [
        "Always on my own",
        "Always in teams",
        "A mix of both",
    ]

    s4Q6Items = [
        "I didn't know I could work in teams",
        "It was easier to work individually",
        "It was less work to do challenges individually",
        "It was more motivating",
        "I just didn't want to",
        "I could do things the way I wanted",
        "I didn’t understand the purpose of working in teams",
        "Other",
    ]

    s4Q7Items = [
        "I didn't know I could work individually",
        "It was easier to work in teams",
        "It was less work to do challenges in teams",
        "It was more motivating",
        "I just didn't want to",
        "I could learn from others",
        "I didn't understand the purpose of working individually",
        "Other",
    ]
    screen = 1

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

        this.s4AgreeQuestions = S4AgreeQuestions
        for (const agreeQuestion of S4AgreeQuestions) {
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

    hasChallenges() {
        const value = this.formGroup.get('S4-2').value
        return !value || value !== '0'
    }

    hasSolo() {
        const value = this.formGroup.get('S4-5').value
        return value && value !== 'Always in teams'
    }

    hasTeam() {
        const value = this.formGroup.get('S4-5').value
        return value && value !== 'Always on my own'
    }

    nextScreen() {
        this.screen += 1
        window.scroll(0, 0)
    }

    previousScreen() {
        this.screen -= 1
        window.scroll(0, 0)
    }

    firstScreen() {
        return this.screen === 1
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
