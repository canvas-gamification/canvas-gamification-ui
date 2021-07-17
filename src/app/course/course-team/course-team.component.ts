import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  MatSort
} from '@angular/material/sort';
import {
  Team
} from "@app/_models/team"
import {
  TeamLeaderBoardService
} from '@app/course/_services/team-leader-board.service';


@Component({
  selector: 'app-course-team',
  templateUrl: './course-team.component.html',
  styleUrls: ['./course-team.component.scss']
})
export class CourseTeamComponent implements OnInit {

  @Input() courseId: number;
  displayedColumns: string[] = ['name', 'tokens'];
  teamListData: MatTableDataSource < {
      name: string,
      tokens: number,
  }> ;
  @ViewChild(MatSort) matSort: MatSort;


  teams: Team[] = [];
  constructor(private teamLeaderboardService: TeamLeaderBoardService) {}



  ngOnInit(): void {

      this.teamLeaderboardService
          .getTeams()
          .subscribe((teams) => {
            console.log(teams);
            
            this.teams = teams;

            console.log(this.teams);
            this.teamListData = new MatTableDataSource(this.teams)
          });
          

  }


}
