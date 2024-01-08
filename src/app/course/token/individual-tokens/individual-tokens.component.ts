import {Component} from '@angular/core'
import {GradeBook} from "@app/_models/grade_book"
import {Course, CourseEvent} from "@app/_models"
import {ActivatedRoute} from "@angular/router"
import {CourseService} from "@app/course/_services/course.service"

@Component({
    selector: 'app-individual-tokens',
    templateUrl: './individual-tokens.component.html',
    styleUrls: ['./individual-tokens.component.scss']
})
export class IndividualTokensComponent {
    grades: GradeBook
    gradesDisplayData: GradeBook
    course: Course
    courseId: number
    events: CourseEvent[]
    showDetailed = false

    // Filter
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
            this.courseService.getMyGrades(this.courseId).subscribe(grades => {
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
    }): void {
        const {event} = values ?? {}
        if (event !== undefined)
            this.event = event
        this.changeDisplay()
    }

    changeDisplay() {
        this.gradesDisplayData = this.grades
            .filter(q => !this.event || q.event_name === this.event)
    }
}
