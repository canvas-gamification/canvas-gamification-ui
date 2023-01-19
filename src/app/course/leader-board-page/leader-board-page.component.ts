import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router"
import {
    Course,
    LeaderBoardPageElement
} from "@app/_models"
import {CourseService} from "@app/course/_services/course.service"

@Component({
    selector: 'app-leader-board-page',
    templateUrl: './leader-board-page.component.html',
    styleUrls: ['./leader-board-page.component.scss']
})
export class LeaderBoardPageComponent implements OnInit{
    courseId: number
    course: Course

    options: LeaderBoardPageElement[]
    selectedEventId: number
    //['course leaderboard', 'challenge 1',  'challenge 2' , 'challenge 3']

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
    ) { }

    ngOnInit(): void {
        this.courseId = +this.route.snapshot.paramMap.get('courseId')
        this.courseService.getCourse(this.courseId).subscribe(course =>  {
            this.course = course
            this.options = this.getOptions()
        })
    }

    getOptions(): LeaderBoardPageElement[] {
        const options = [
            {
                eventId: null,
                name: this.course?.name,
            }
        ]
        this.course?.events.filter( event => event.type === 'CHALLENGE')
            .forEach(event => options.push(
                {
                    eventId: event.id,
                    name: event.name,
                }
            ))
        return options
    }

    setSelectedEventId(eventId: number|null): void {
        this.selectedEventId = eventId
        console.log(this.selectedEventId )
    }
}
