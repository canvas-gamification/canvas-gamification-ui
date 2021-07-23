import {Component, OnInit, Input, ViewChild,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Team} from "@app/_models/team"
import {TeamLeaderBoardService} from '@app/course/_services/team-leader-board.service';
import {ToastrService} from "ngx-toastr";
import {FormGroup} from '@angular/forms';
import {CourseTeamRegisterForm} from '@app/course/_forms/course-team-register.form';


@Component({
  selector: 'app-course-team',
  templateUrl: './course-team.component.html',
  styleUrls: ['./course-team.component.scss']
})
export class CourseTeamComponent implements OnInit {


  formData: FormGroup;

  @Input() courseId: number;
  displayedColumns: string[] = ['name'];

  teams: Team[] = [];
  constructor(private route: ActivatedRoute,
    private teamLeaderBoardService: TeamLeaderBoardService,
    private toastr: ToastrService,
    private router: Router) {}



  ngOnInit(): void {

    this.formData = CourseTeamRegisterForm.createForm();

      // Convert to number
      this.courseId = +this.route.snapshot.paramMap.get('courseId');

      this.teamLeaderBoardService
          .getTeams()
          .subscribe((teams) => {
            console.log(teams);
            
            this.teams = teams;

            console.log(this.teams);
          });
          
  }

  submitEvent(formData: FormGroup): void {
    console.log(formData);
    const ourTeam: Team = CourseTeamRegisterForm.formatFormData(formData, this.courseId);
  
    //
    this.teamLeaderBoardService.joinTeam(ourTeam).subscribe(
        () => {
            this.router.navigate(['course', this.courseId]).then();
            this.toastr.success('The user has been added  to the team successfully.');
        }, error => {
            this.toastr.error(error);
        }
    );
}


}
