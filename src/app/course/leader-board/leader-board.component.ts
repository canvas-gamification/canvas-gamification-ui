// Angular Imports
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
// Model Imports
import {LeaderBoardStudents} from '@app/_models/leader_board';
// Services Imports
import {LeaderBoardService} from '@app//course/_services/leaderboard.service';

@Component({
    selector: 'app-leader-board',
    templateUrl: './leader-board.component.html',
    styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit, AfterViewInit {

    // Array of objects
    // Storing the top three users and their number of tokens
    topThree: {
        name: string,
        token: number
    } [] = [];

    // Array of objects
    // Storing all users in the leaderboard
    // Passed down from the course component
    @Input() leaderBoard: {
        name: string,
        token: number,
    } [];

    displayedColumns: string[] = ['rank', 'name', 'token'];
    leaderBoardData: MatTableDataSource<{
        name: string,
        token: number,
    }>;
    @ViewChild(MatSort) matSort: MatSort;

    teamTopThree: LeaderBoardStudents[] = [];
    teamUsers: LeaderBoardStudents[] = [];

    constructor(private leaderboardService: LeaderBoardService) {
    }

    ngOnInit(): void {

        // Sort the input leaderboard in descending order based on number of tokens
        this.leaderBoard = this.leaderBoard.sort((a, b) => {
            if (a.token < b.token) {
                return 1;
            }
            if (a.token > b.token) {
                return -1;
            }
            return 0;
        });

        // Pop the top three users from leaderBoard and store them in topThree
        for (let i = 0; i < 3; i++) {
            if (this.leaderBoard[0]) {
                this.topThree.push(this.leaderBoard.shift());
            } else {
                break;
            }
        }
    }

    ngAfterViewInit(): void {
        // intialize the datasource for the matTable from leaderBoard
        this.leaderBoardData = new MatTableDataSource(this.leaderBoard);
    }
}
