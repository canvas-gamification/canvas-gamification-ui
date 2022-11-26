import {Component, Inject, OnInit} from '@angular/core'
import {CourseRegistration, User} from '@app/_models'
import {TokenUseService} from '@app/course/_services/token-use.service'
import {ActivatedRoute} from '@angular/router'
import {TokenUse} from '@app/_models/token_use'
import {AuthenticationService} from '@app/_services/api/authentication'
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {CourseService} from "@app/course/_services/course.service"

@Component({
    selector: 'app-token-use-snippet',
    templateUrl: './token-use-snippet.component.html',
    styleUrls: ['./token-use-snippet.component.scss']
})
export class TokenUseSnippetComponent implements OnInit {
    courseReg: CourseRegistration

    tokenUses: TokenUse[]
    tokenUsesTableHeaders: string[] = ['assignment_name', 'tokens_required', 'points_given', 'maximum_number_of_use', 'actions']

    user: User
    courseId: number

    invalid: boolean
    remainingTokens: number

    constructor(
        private tokenUseService: TokenUseService,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private courseService: CourseService,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService
    ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
        this.courseId = this.route.snapshot.parent.params.courseId
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.courseReg = course.course_reg
            this.tokenUses = this.courseReg.token_uses
            this.calculateCurrentTotal()
        })
    }

    /**
     * Update the current number of tokens left for the user if they use this option
     */
    calculateCurrentTotal(): void {
        this.remainingTokens = this.courseReg.total_tokens_received
        for (const optionId in this.tokenUses) {
            this.remainingTokens -= this.tokenUses[optionId].num_used * this.tokenUses[optionId].option.tokens_required
        }
        this.invalid = this.remainingTokens < 0
    }

    /**
     * Confirms the current token uses and sends the data to the server
     */
    confirmChanges(): void {
        const courseId = this.route.snapshot.parent.params.courseId
        const data = {}
        this.tokenUses.forEach(tokenUse => data[tokenUse.option.id] = tokenUse.num_used)
        this.tokenUseService.useTokens(data, courseId).subscribe(() => {
            this.notificationsService
                .show('Token Uses Saved!', {
                    status: TuiNotification.Success
                }).subscribe()
        })
    }
}
