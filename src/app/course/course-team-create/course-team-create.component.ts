// Angular Imports
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
// Model Imports
import {Team} from '@app/_models/team';
// Form Imports
import {CourseTeamForm} from "@app/course/_forms/course-team.form";
// Service Imports
import {TeamLeaderBoardService} from '@app/course/_services/team-leader-board.service';

@Component({
    selector: 'app-course-create-team',
    templateUrl: './course-team-create.component.html',
    styleUrls: ['./course-team-create.component.scss']
})
export class CourseTeamCreateComponent implements OnInit {
    courseId: number;
    formData: FormGroup;

    constructor(private route: ActivatedRoute,
                private teamLeaderBoardService: TeamLeaderBoardService,
                private toastr: ToastrService,
                private router: Router) {
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formData.controls;
    }

    ngOnInit(): void {
        this.formData = CourseTeamForm.createForm();

        // Convert to number
        this.courseId = +this.route.snapshot.paramMap.get('courseId');
    }

    /**
     * Sends the team data to the server.
     * @param formData - grabs the components formData and creates a request based on that
     */
    submitEvent(formData: FormGroup): void {

        const ourTeam: Team = CourseTeamForm.formatFormData(formData, this.courseId);
        this.teamLeaderBoardService.addTeam(ourTeam).subscribe(
            () => {
                this.router.navigate(['course', this.courseId]).then();
                this.toastr.success('The Team has been added Successfully.');
            }, error => {
                this.toastr.error(error);
            }
        );
    }
}
