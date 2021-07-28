// Angular Imports
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
// Model Imports
import {User, Team} from "@app/_models";
import {TeamRegistration} from "@app/_models/team_registration";
// Form Imports
import {CourseTeamRegisterForm} from '@app/course/_forms/course-team-register.form';
// Services Imports
import {TeamLeaderBoardService} from '@app/course/_services/team-leader-board.service';
//Library Imports
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-course-team-list',
    templateUrl: './course-team-list.component.html',
    styleUrls: ['./course-team-list.component.scss']
})
export class CourseTeamListComponent implements OnInit {

    // Course Id passed from course.component
    @Input() courseId: number;
    @Input() user: User;
    // Array of teams retrieved from backend
    teams: Team[] = [];
    teamRegistration: TeamRegistration;

    // Form group used to pass necessary data for registration
    formData: FormGroup;

    constructor(private route: ActivatedRoute,
                private teamLeaderBoardService: TeamLeaderBoardService,
                private toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
        // initialize formData
        this.formData = CourseTeamRegisterForm.createForm();

        this.teamLeaderBoardService
            .getTeams((String)(this.courseId))
            .subscribe((teams) => {
                this.teams = teams;
                console.log(this.teams);
            });

        this.teamLeaderBoardService
            .getTeamRegistration(this.courseId, (String)(this.user.id))
            .subscribe((registration) => {
                console.log(registration);
                this.teamRegistration = registration;
            });
    }

    //call the service to join a team upon submission of the form (clicking on the Join button)
    submitEvent(formData: FormGroup): void {

        console.log(formData);
        const ourTeam: Team = CourseTeamRegisterForm.formatFormData(formData, this.courseId);

        this.teamLeaderBoardService.joinTeam(ourTeam).subscribe(
            () => {
                this.router.navigate(['course', this.courseId]).then();
                this.toastr.success('The user has been added  to the team successfully.');
            }, error => {
                this.toastr.error(error);
            }
        );
    }

    joinHandler(event: any): void {

        const targetTeam: Team = {
            team_id: event.target.value,
            course_id: this.courseId
        };
        this.teamLeaderBoardService.joinTeam(targetTeam).subscribe(
            () => {
                this.router.navigate(['course', this.courseId]).then();
                this.toastr.success('The user has been added  to the team successfully.');
            }, error => {
                this.toastr.error(error);
            }
        );
    }

    leaveHandler(event: any): void {

        const targetTeam: Team = {
            team_id: event.target.value,
            course_id: this.courseId
        };
        this.teamLeaderBoardService.leaveTeam(targetTeam).subscribe(
            () => {
                this.router.navigate(['course', this.courseId]).then();
                this.toastr.success('The user has left the team successfully.');
            }, error => {
                this.toastr.error(error);
            }
        );
    }
}
