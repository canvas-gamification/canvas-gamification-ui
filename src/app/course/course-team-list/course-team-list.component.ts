// Angular Imports
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {forkJoin} from 'rxjs';
// Model Imports
import {Team, User} from "@app/_models";
import {TeamRegistration} from "@app/_models/team_registration";
// Form Imports
import {CourseTeamRegisterForm} from '@app/course/_forms/course-team-register.form';
// Services Imports
import {TeamLeaderBoardService} from '@app/course/_services/team-leader-board.service';


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
                private router: Router) {
    }

    ngOnInit(): void {
        // initialize formData
        this.formData = CourseTeamRegisterForm.createForm();


        forkJoin({
            teams: this.teamLeaderBoardService.getTeams(this.courseId),
            teamRegistration: this.teamLeaderBoardService.getTeamRegistration(this.courseId)
        }).subscribe(result => {
            this.teams = result.teams;
            this.teamRegistration = result.teamRegistration;
        });

    }

    /**
     *  Handles event trigger when user clicks on a 'join' button
     *  submits a update request to the API through the teamLeaderBoardService
     * @param event - event to be handled
     */
    joinHandler(event: Event): void {

        const targetTeam = {
            id: +(event.target as HTMLInputElement).value,
            course_id: this.courseId
        };
        this.teamLeaderBoardService
            .joinTeam(targetTeam)
            .subscribe(() => {
                window.location.reload();
            });

    }

    /**
     * Handles event trigger when user clicks on a 'leave' button
     * submits a delete request to the API through the teamLeaderBoardService
     * @param event - event to be handled
     */
    leaveHandler(event: Event): void {

        const targetTeam = {
            id: +(event.target as HTMLInputElement).value,
            course_id: this.courseId
        };
        this.teamLeaderBoardService
            .leaveTeam(targetTeam)
            .subscribe(() => {
                window.location.reload();
            });
    }
}
