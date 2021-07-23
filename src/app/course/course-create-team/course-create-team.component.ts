import {
    Component,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import {
    Team
} from '@app/_models/team';
import {
    TeamLeaderBoardService
} from '@app/course/_services/team-leader-board.service';
import {
    ToastrService
} from "ngx-toastr";
import {
    AbstractControl,
    FormGroup
} from '@angular/forms';
import {
    CourseTeamForm
} from "@app/course/_forms/course-team.form";

@Component({
    selector: 'app-course-create-team',
    templateUrl: './course-create-team.component.html',
    styleUrls: ['./course-create-team.component.scss']
})
export class CourseCreateTeamComponent implements OnInit {
    courseId: number;
    formData: FormGroup;

    constructor(private route: ActivatedRoute,
        private teamLeaderBoardService: TeamLeaderBoardService,
        private toastr: ToastrService,
        private router: Router) {}

    ngOnInit(): void {
        this.formData = CourseTeamForm.createForm();

        // Convert to number
        this.courseId = +this.route.snapshot.paramMap.get('courseId');

    }

    get form(): {
        [p: string]: AbstractControl
        } {
        return this.formData.controls;
    }

    /**
     * Sends the team data to the server. 
     * @param formData - grabs the components formData and creates a request based on that
     */
    submitEvent(formData: FormGroup): void {

        const ourTeam: Team = CourseTeamForm.formatFormData(formData, this.courseId);
        console.log(ourTeam);
        //
        this.teamLeaderBoardService.addTeam(this.courseId, ourTeam).subscribe(
            () => {
                this.router.navigate(['course', this.courseId]).then();
                this.toastr.success('The Team has been added Successfully.');
            }, error => {
                this.toastr.error(error);
            }
        );
    }
}
