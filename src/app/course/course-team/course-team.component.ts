import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit
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


  displayedColumns: string[] = ['rank', 'name', 'token'];
  teamLeaderBoardData: MatTableDataSource < {
      name: string,
      tokens: number,
  } > ;
  @ViewChild(MatSort) matSort: MatSort;


  teamTopThree: Team[] = [];
  teams: Team[] = [];
  constructor(private teamLeaderboardService: TeamLeaderBoardService) {}



  ngOnInit(): void {

      this.teamLeaderboardService
          .getTeams()
          .subscribe((teams) => {

              this.teams = teams.sort((a, b) => {
                  if (a.tokens < b.tokens) {
                      return 1;
                  }
                  if (a.tokens > b.tokens) {
                      return -1
                  }
                  return 0;
              });

              for (let i = 0; i < 3; i++) {
                  if (this.teams[0]) {
                      this.teamTopThree.push(this.teams.shift());
                  } else {
                      break;
                  }
              }
              this.teamLeaderBoardData = new MatTableDataSource(this.teams);
          });
          

  }
}
