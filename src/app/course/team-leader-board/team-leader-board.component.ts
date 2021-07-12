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
import { LeaderBoardStudents} from '@app/_models/leader_board';
import { LeaderBoardService } from '@app/_services/api/leaderboard.service';

@Component({
    selector: 'app-team-leader-board',
    templateUrl: './team-leader-board.component.html',
    styleUrls: ['./team-leader-board.component.scss']
})
export class TeamLeaderBoardComponent implements OnInit, AfterViewInit {


    displayedColumns: string[] = ['rank', 'name', 'token'];
    teamLeaderBoardData: MatTableDataSource < {
        student_name: string,
        token_value: number,
    } > ;
    @ViewChild(MatSort) matSort: MatSort;


    teamTopThree: LeaderBoardStudents[] = [];
    teamUsers: LeaderBoardStudents[] = [];
    constructor(private leaderboardService: LeaderBoardService) {}



    ngOnInit(): void {

        this.leaderboardService
            .getLeaderBoard()
            .subscribe((users) => {
                
                this.teamUsers = users.sort((a, b) => {
                    if (a.token_value < b.token_value) {
                        return 1;
                    }
                    if (a.token_value > b.token_value) {
                        return -1;
                    }
                    return 0;
                });

                for (let i = 0; i < 3; i++) {
                    this.teamTopThree.push(this.teamUsers.shift());
                }
                console.log(this.teamTopThree);
                console.log(this.teamUsers);
                this.teamLeaderBoardData = new MatTableDataSource(this.teamUsers);
            });


    }



    ngAfterViewInit(): void {
        // intialize the datasource for the matTable from leaderBoard
        console.log(this.teamUsers);
        


    }

    // ! Methods to animate and unanimate the streak icons
    // ! Not currently in use
    // turnToGif(e: Event): void {
    //     const parent = e.target as HTMLElement;
    //     if (parent.children[2].children[0]) {
    //         const img = parent.children[2].children[0].children[0] as HTMLImageElement;
    //         const fire: string = window.location.origin + '/assets/gif/fire-still.png';
    //         const snow: string = window.location.origin + '/assets/gif/snow-still.png';
    //         if (img.src == fire) {
    //             img.src = 'assets/gif/fire.gif';
    //         } else if (img.src == snow) {
    //             img.src = 'assets/gif/snow.gif';
    //         }
    //     }
    // }

    // turnToStatic(e: Event): void {
    //     const parent = e.target as HTMLElement;
    //     if (parent.children[2].children[0]) {
    //         const img = parent.children[2].children[0].children[0] as HTMLImageElement;
    //         const fire: string = window.location.origin + '/assets/gif/fire.gif';
    //         const snow: string = window.location.origin + '/assets/gif/snow.gif';
    //         if (img.src == fire) {
    //             img.src = 'assets/gif/fire-still.png';
    //         } else if (img.src == snow) {
    //             img.src = 'assets/gif/snow-still.png';
    //         }
    //     }
    // }

}
