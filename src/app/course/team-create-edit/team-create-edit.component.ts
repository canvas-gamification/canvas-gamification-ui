import {Component, Inject, OnInit} from '@angular/core'
import {FormGroup} from "@angular/forms"
import {TeamForm} from "@app/course/_forms/team.form"
import {Course, CourseRegistration} from "@app/_models"
import {ActivatedRoute, Router} from "@angular/router"
import {CourseService} from "@app/course/_services/course.service"
import {TuiContextWithImplicit, TuiStringHandler} from "@taiga-ui/cdk"
import {TeamService} from "@app/course/_services/team.service"
import {Team} from "@app/_models/team"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"

@Component({
    selector: 'app-team-create-edit',
    templateUrl: './team-create-edit.component.html',
    styleUrls: ['./team-create-edit.component.scss']
})
export class TeamCreateEditComponent implements OnInit {
    formData: FormGroup
    courseId: number
    eventId: number
    teamId: number = null
    team: Team
    courseRegs: CourseRegistration[]
    course: Course

    list=[{id:1, name:'name1'},{id:2, name:'name2'},{id:3, name:'name3'}]

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private teamService: TeamService,
        private router: Router,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,
    ) {
    }

    ngOnInit(): void {
        this.formData = TeamForm.createTeamForm()
        this.courseId = +this.route.snapshot.parent.paramMap.get('courseId')
        this.eventId = +this.route.snapshot.paramMap.get('eventId')

        if(this.route.snapshot.paramMap.get('teamId')){// For editing existing team, grab the teamId
            this.teamId = +this.route.snapshot.paramMap.get('teamId')
            this.teamService.getTeam(this.teamId).subscribe( team => {
                this.team = team
                this.formData = TeamForm.createTeamFormTeam(team)
            })

        }

        //returns: Failed to load resource: the server responded with a status of 404 (Not Found)
        this.courseService.getCourseRegistrations(this.courseId).subscribe( courseRegs => this.courseRegs = courseRegs )

        this.courseService.getCourse(this.courseId).subscribe( course => this.course = course)
    }

    isPrivate(): boolean {
        return this.formData?.get('isPrivate')?.value
    }

    stringify(courseReg): TuiStringHandler<CourseRegistration | TuiContextWithImplicit<CourseRegistration>> {
        return `name` in courseReg ? courseReg.name : courseReg.$implicit.name
    }

    // onSearch(search: string | null): void {
    //     this.search$.next(search || ``)
    // }

    getCourseRegistration(inputCourseRegId: number):CourseRegistration {
        return this.courseRegs.find( courseReg => courseReg.id === inputCourseRegId)
    }

    onSubmit(): void {
        console.log(this.formData.get('invitedMembers').value)

        const teamData = TeamForm.formatTeamFormData(this.formData, this.eventId, this.course.course_reg.id)
        if(this.teamId){ // Editing existing team
            this.teamService.updateTeam(teamData, this.teamId).subscribe(() => {
                this.notificationsService
                    .show('The Team has been updated Successfully.', {
                        status: TuiNotification.Success
                    })
                this.router.navigate(['course', this.courseId, 'challenge', this.eventId, 'teams']).then()
            })
        }else{ // Creating a brand new team
            this.teamService.createAndJoin(teamData).subscribe(() => {
                this.notificationsService
                    .show('The Team has been added Successfully.', {
                        status: TuiNotification.Success
                    })
                this.router.navigate(['course', this.courseId, 'challenge', this.eventId, 'teams']).then()
            })
        }
    }

}
