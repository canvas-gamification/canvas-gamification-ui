import {Component} from '@angular/core'
import {GradeBook} from "@app/_models/grade_book"
import {Course, CourseEvent} from "@app/_models"
import {ActivatedRoute} from "@angular/router"
import {CourseService} from "@app/course/_services/course.service"

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
        console.log(b)
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
        this.gradesDisplayData = this.grades.filter(q => !this.query || q.name.toLowerCase().includes(this.query.toLowerCase()))
            .filter(q => !this.event || q.event_name === this.event)
    }
}
