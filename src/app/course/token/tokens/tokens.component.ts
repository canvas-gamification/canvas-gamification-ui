import {Component} from '@angular/core'
import {GradeBook} from "@app/_models/grade_book"
import {Course, CourseEvent} from "@app/_models"
import {ActivatedRoute} from "@angular/router"
import {CourseService} from "@app/course/_services/course.service"
import {ApiService} from "@app/_services/api.service"

@Component({
    selector: 'app-tokens',
    templateUrl: './tokens.component.html',
    styleUrls: ['./tokens.component.scss']
})
export class TokensComponent {
    grades: GradeBook
    gradesDisplayData: GradeBook
    course: Course
    courseId: number
    events: CourseEvent[]
    showDetailed = false

    // Filter
    query: string
    event: string

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private apiService: ApiService
    ) {
        this.courseId = this.route.snapshot.parent.params.courseId
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
            const types = ["ASSIGNMENT", "EXAM"]
            this.events = course?.events.filter(obj => types.includes(obj.type))
            this.courseService.getGradeBook(this.courseId).subscribe(grades => {
                this.grades = grades
                this.gradesDisplayData = grades
            })
        })
    }

    setDetailedView(b: boolean): void {
        this.showDetailed = b
    }

    /**
     * Update the current view of the grade table.
     */
    update(values?: {
        event?: string,
        query?: string,
    }): void {
        const {event, query} = values ?? {}
        if (event !== undefined)
            this.event = event
        if (query !== undefined)
            this.query = query
        this.changeDisplay()
    }

    changeDisplay() {
        this.gradesDisplayData = this.grades.filter(q => !this.query ||
            q.name.toLowerCase().includes(this.query.toLowerCase()))
            .filter(q => !this.event || q.event_name === this.event)
    }

    getUrl() {
        const params = new URLSearchParams()

        if (this.event !== '' && this.event !== undefined) {
            params.set("event_name", this.event)
        }
        if (this.query !== '' && this.query !== undefined) {
            params.set("student_name", this.query)
        }
        if (this.showDetailed) {
            params.set("details", String(this.showDetailed))
        }

        return this.apiService.getURL('course', this.courseId, 'export-grade-book') + "?"
            + params.toString()
    }
}
