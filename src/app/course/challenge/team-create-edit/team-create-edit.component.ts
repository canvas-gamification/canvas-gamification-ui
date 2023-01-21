import {Component, Inject, OnInit} from '@angular/core'
import {FormGroup} from "@angular/forms"
import {TeamForm} from "@app/course/_forms/team.form"
import {Course, CourseEvent, CourseRegistration} from "@app/_models"
import {ActivatedRoute, Router} from "@angular/router"
import {CourseService} from "@app/course/_services/course.service"
import {TeamService} from "@app/course/_services/team.service"
import {Team} from "@app/_models/team"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {CourseEventService} from "@app/course/_services/course-event.service"

@Component({
    selector: 'app-team-create-edit',
    templateUrl: './team-create-edit.component.html',
    styleUrls: ['./team-create-edit.component.scss']
})
export class TeamCreateEditComponent implements OnInit {
    formData: FormGroup
    courseId: number
    eventId: number
    event: CourseEvent
    teamId: number = null
    team: Team
    courseRegs: CourseRegistration[]
    course: Course
    search: string

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private courseEventService: CourseEventService,
        private teamService: TeamService,
        private router: Router,
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService,
    ) {
    }

    ngOnInit(): void {
        this.formData = TeamForm.createTeamForm()
        this.courseId = +this.route.snapshot.parent.paramMap.get('courseId')
        this.eventId = +this.route.snapshot.paramMap.get('eventId')
        this.courseEventService.getCourseEvent(this.eventId)
            .subscribe(event => this.event = event)
        this.courseService.getCourse(this.courseId).subscribe(course => this.course = course)
        this.courseService.getCourseRegistrations(this.courseId).subscribe(courseRegs => {
            this.courseRegs = courseRegs

            if (this.route.snapshot.paramMap.get('teamId')) {
                this.teamId = +this.route.snapshot.paramMap.get('teamId')
                this.teamService.getTeam(this.teamId).subscribe(team => {
                    this.formData = TeamForm.createTeamFormTeam(team, this.courseRegs)
                    this.team = team
                }, error => console.debug(error))
            }
        })
    }

    isPrivate(): boolean {
        return this.formData?.get('isPrivate')?.value
    }

    stringify(courseReg: CourseRegistration): string {
        return courseReg.name
    }

    getCourseRegistrations() {
        if (!this.search)
            return this.courseRegs
        return this.courseRegs.filter(reg => reg.name.includes(this.search))
    }

    onSearchChange(searchQuery: string | null): void {
        this.search = searchQuery
    }

    getCourseRegistration(inputCourseRegId: number): CourseRegistration {
        return this.courseRegs.find(courseReg => courseReg.id === inputCourseRegId)
    }

    onSubmit(): void {
        const teamData = TeamForm.formatTeamFormData(this.formData, this.eventId)
        if (this.teamId) {
            this.teamService.updateTeam(teamData, this.teamId).subscribe(() => {
                this.notificationsService
                    .show('The team has been updated successfully.', {
                        status: TuiNotification.Success
                    }).subscribe()
                this.router.navigate(
                    ['course', this.courseId, 'challenge', this.eventId, 'teams']
                ).then()
            })
        } else {
            this.teamService.createAndJoin(teamData).subscribe(() => {
                this.notificationsService
                    .show('The team has been created successfully.', {
                        status: TuiNotification.Success
                    }).subscribe()
                this.router.navigate(
                    ['course', this.courseId, 'challenge', this.eventId, 'teams']
                ).then()
            })
        }
    }
}
