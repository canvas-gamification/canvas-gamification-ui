import {AfterContentChecked, ChangeDetectorRef, Component, Inject} from '@angular/core'
import {User} from '@app/_models'
import {ActivatedRoute} from '@angular/router'
import {AuthenticationService} from '@app/_services/api/authentication'
import {TuiNotificationsService} from "@taiga-ui/core"
import {CourseService} from "@app/course/_services/course.service"
import {GradeBook} from "@app/_models/grade_book"

@Component({
    selector: 'app-token-use-snippet',
    templateUrl: './token-use-snippet.component.html',
    styleUrls: ['./token-use-snippet.component.scss']
})
export class TokenUseSnippetComponent implements AfterContentChecked {
    grades: GradeBook
    gradesDisplayData: GradeBook
    gradeBookTableHeaders = [
        'name', 'event_name', 'grade', 'total'
    ]
    gradeBookTableDetailedHeaders: string[] = [
        'name', 'event_name', 'grade', 'total', 'title', 'question_grade', 'attempts'
    ]

    user: User
    courseId: number
    showDetailed = false

    // Pagination
    numberOfGradeLines = 0
    pageSize = 10
    page = 0


    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private courseService: CourseService,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,
        private changeDetector: ChangeDetectorRef
    ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
        this.courseId = this.route.snapshot.parent.params.courseId

        this.courseService.getGradeBook(this.courseId).subscribe(grades => {
            this.grades = grades
            this.numberOfGradeLines = grades.length
            this.gradesDisplayData = grades.slice(this.page * this.pageSize, this.page * this.pageSize + this.pageSize)
        })
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges()
    }

    setDetailedView(b: boolean): void {
        this.showDetailed = b
    }

    /**
     * Update the current view of the grade table.
     */
    update(values?: { page?: number, pageSize?: number }): void {
        const {page, pageSize} = values ?? {}
        if (page || (page === 0 && this.page === 1))
            this.page = page
        if (pageSize)
            this.pageSize = pageSize
        this.changeDisplay()
    }

    /**
     * This does the actually updating because pagination is being faked.
     */
    changeDisplay() {
        this.gradesDisplayData = this.grades.slice(this.page * this.pageSize, this.page * this.pageSize + this.pageSize)
    }

    // /**
    //  * Update the current number of tokens left for the user if they use this option
    //  */
    // calculateCurrentTotal(): void {
    //     this.remainingTokens = this.courseReg.total_tokens_received
    //     for (const optionId in this.tokenUses) {
    //         this.remainingTokens -= this.tokenUses[optionId].num_used * this.tokenUses[optionId].option.tokens_required
    //     }
    //     this.invalid = this.remainingTokens < 0
    // }
    //
    // /**
    //  * Confirms the current token uses and sends the data to the server
    //  */
    // confirmChanges(): void {
    //     const courseId = this.route.snapshot.parent.params.courseId
    //     const data = {}
    //     this.tokenUses.forEach(tokenUse => data[tokenUse.option.id] = tokenUse.num_used)
    //     this.tokenUseService.useTokens(data, courseId).subscribe(() => {
    //         this.notificationsService
    //             .show('Token uses saved!', {
    //                 status: TuiNotification.Success
    //             }).subscribe()
    //     })
    // }
}
