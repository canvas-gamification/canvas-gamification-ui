import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject
} from '@angular/core'
import {CourseEvent, User} from '@app/_models'
import {ActivatedRoute} from '@angular/router'
import {AuthenticationService} from '@app/_services/api/authentication'
import {TuiNotificationsService} from "@taiga-ui/core"
import {CourseService} from "@app/course/_services/course.service"
import {GradeBook} from "@app/_models/grade_book"
import {FormControl, FormGroup} from "@angular/forms";
import {filter} from "rxjs/operators";
import {CourseEventService} from "@app/course/_services/course-event.service";

@Component({
    selector: 'app-token-use-snippet',
    templateUrl: './token-use-snippet.component.html',
    styleUrls: ['./token-use-snippet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TokenUseSnippetComponent implements AfterContentChecked {
    grades: GradeBook
    gradesDisplayData: GradeBook
    gradeBookTableHeaders: string[] = [
        'name', 'event_name', 'grade'
    ]
    gradeBookTableDetailedHeaders: string[] = [
        'name', 'event_name', 'grade', 'title', 'question_grade', 'attempts'
    ]

    readonly name_filter = new FormGroup({
        search: new FormControl(''),
    })


    user: User
    courseId: number
    events: CourseEvent[]
    showDetailed = false

    // Pagination
    numberOfGradeLines = 0
    pageSize = 10
    page = 0


    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private courseService: CourseService,
        private courseEventService: CourseEventService,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,
        private changeDetector: ChangeDetectorRef
    ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
        this.courseId = this.route.snapshot.parent.params.courseId
        this.courseEventService.getAllEvents().subscribe(events => {
            const types = ["ASSIGNMENT", "EXAM"]
            this.events = events.filter(obj => types.includes(obj.type))
        })

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

    protected readonly filter = filter;
}
