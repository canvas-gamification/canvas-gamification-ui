import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core'
import {Course, CourseEvent, User} from '@app/_models'
import {ActivatedRoute} from '@angular/router'
import {AuthenticationService} from '@app/_services/api/authentication'
import {CourseService} from "@app/course/_services/course.service"
import {GradeBook} from "@app/_models/grade_book"


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

    // Filter
    query: string
    event: string

    // Pagination
    numberOfGradeLines = 0
    pageSize = 10
    page = 0

    user: User
    course: Course
    courseId: number
    events: CourseEvent[]
    showDetailed = false
    isInstructor = false


    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private courseService: CourseService,
        private changeDetector: ChangeDetectorRef
    ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
        this.courseId = this.route.snapshot.parent.params.courseId
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
            const types = ["ASSIGNMENT", "EXAM"]
            this.events = course?.events.filter(obj => types.includes(obj.type))
            this.isInstructor = this.user.id === this.course.instructor
            if (this.isInstructor) {
                this.courseService.getGradeBook(this.courseId).subscribe(grades => {
                    this.grades = grades
                    this.numberOfGradeLines = grades.length
                    this.gradesDisplayData = grades.slice(this.page * this.pageSize, this.page * this.pageSize + this.pageSize)
                })
            } else {
                this.courseService.getMyGrades(this.courseId).subscribe(grades => {
                    this.grades = grades
                    this.numberOfGradeLines = grades.length
                    this.gradesDisplayData = grades.slice(this.page * this.pageSize, this.page * this.pageSize + this.pageSize)
                })
            }
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
    update(values?: {
        page?: number,
        pageSize?: number,
        event?: string,
        query?: string,
    }): void {
        const {page, pageSize, event, query} = values ?? {}
        if (page || (page === 0 && this.page === 1))
            this.page = page
        if (pageSize)
            this.pageSize = pageSize
        if (event !== undefined)
            this.event = event
        if (query !== undefined)
            this.query = query
        this.changeDisplay()
    }

    /**
     * This does the actually updating because pagination is being faked.
     */
    changeDisplay() {
        this.gradesDisplayData = this.grades.filter(q => !this.query || q.name.toLowerCase().includes(this.query.toLowerCase()))
            .filter(q => !this.event || q.event_name === this.event).slice(
                this.page * this.pageSize,
                this.page * this.pageSize + this.pageSize
            )
    }
}
