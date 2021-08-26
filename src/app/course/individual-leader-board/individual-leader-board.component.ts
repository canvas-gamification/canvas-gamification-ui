// Angular Imports
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

// Model Imports

@Component({
    selector: 'app-individual-leader-board',
    templateUrl: './individual-leader-board.component.html',
    styleUrls: ['./individual-leader-board.component.scss']
})

export class IndividualLeaderBoardComponent implements OnInit, AfterViewInit {

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

    displayedColumns = ['rank', 'name', 'token'];
    leaderBoardData: MatTableDataSource<{
        name: string,
        token: number,
    }>;
    @ViewChild(MatSort) matSort: MatSort;

    ngOnInit(): void {

        this.leaderBoardSort(this.leaderBoard);
        this.podiumSort();
    }

    ngAfterViewInit(): void {
        // initialize the datasource for the matTable from leaderBoard
        this.leaderBoardData = new MatTableDataSource(this.leaderBoard);
    }

    /**
     * Sort the input leaderboard in descending order based on number of tokens
     * @param leaderBoard - array of user, token pairs to be sorted
     */
    leaderBoardSort(leaderBoard: { name: string, token: number } []): void {
        this.leaderBoard = leaderBoard.sort((a, b) => {
            if (a.token < b.token) {
                return 1;
            }
            if (a.token > b.token) {
                return -1;
            }
            return 0;
        });
    }

    /**
     * Gets the top three teams on this leaderboard
     */
    podiumSort(): void {
        for (let i = 0; i < 3; i++) {
            if (this.leaderBoard[0]) {
                this.topThree.push(this.leaderBoard.shift());
            } else {
                break;
            }
        }
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
