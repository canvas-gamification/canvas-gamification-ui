// Angular Imports
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
// Model Imports
import {Team} from "@app/_models/team";
// Services Imports
import {TeamLeaderBoardService} from '@app/course/_services/team-leader-board.service';

@Component({
    selector: 'app-team-leader-board',
    templateUrl: './team-leader-board.component.html',
    styleUrls: ['../individual-leader-board/individual-leader-board.component.scss']
})
export class TeamLeaderBoardComponent implements OnInit {

    @Input() courseId: number;
    displayedColumns = ['rank', 'name', 'token'];
    teamLeaderBoardData: MatTableDataSource<{
        name?: string,
        tokens?: number,
    }>;
    @ViewChild(MatSort) matSort: MatSort;

    teamTopThree: Team[] = [];
    teams: Team[] = [];

    constructor(private teamLeaderboardService: TeamLeaderBoardService) {
    }

    ngOnInit(): void {

        this.teamLeaderboardService
            .getTeams((this.courseId))
            .subscribe((teams) => {

                this.leaderBoardSort(teams);
                this.podiumSort()
                this.teamLeaderBoardData = new MatTableDataSource(this.teams);
            });
    }

    /**
     * Sorts teams by descending from highest to lowest token values 
     * @param teams 
     */
    leaderBoardSort(teams: Team[]) : void {
        this.teams = teams.sort((a, b) => {
            if (a.tokens < b.tokens) {
                return 1;
            }
            if (a.tokens > b.tokens) {
                return -1;
            }
            return 0;
        });

    }

    /**
     * Gets the top three teams on this leaderboard
     */
    podiumSort() : void {
        for (let i = 0; i < 3; i++) {
            if (this.teams[0]) {
                this.teamTopThree.push(this.teams.shift());
            } else {
                break;
            }
        }
    }
}
