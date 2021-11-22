import {Component, Input, OnInit} from '@angular/core';
import {LeaderboardElement} from "@app/_models";

@Component({
    selector: 'app-leader-board',
    templateUrl: './leader-board.component.html',
    styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {
    @Input() leaderBoard: LeaderboardElement[];
    @Input() rankTopX: number;
    displayedColumns: string[] = ['rank', 'name', 'token'];

    readonly filterOutTopX = (element: LeaderboardElement, x: number): boolean => element.rank > x;
    readonly filterInTopX = (element: LeaderboardElement, x: number): boolean => element.rank <= x;

    ngOnInit(): void {
        this.leaderBoard = this.getRankedLeaderboard(this.leaderBoard);
    }

    /**
     * Takes an unranked leaderboard, and returns a ranked version of it
     * @param leaderBoard
     */
    getRankedLeaderboard(leaderBoard: LeaderboardElement[]): LeaderboardElement[] {
        const sortedLeaderboard = leaderBoard.sort((a, b) => b.token - a.token);
        return sortedLeaderboard.map((element, index) => {
            return {
                rank: index + 1,
                name: element.name,
                token: element.token
            };
        });
    }

    /**
     * Takes a number and returns the ordinal version of it
     * @implements https://community.shopify.com/c/shopify-design/ordinal-number-in-javascript-1st-2nd-3rd-4th/m-p/72156
     * @param n
     */
    getGetOrdinal(n: number): string {
        const s = ["th", "st", "nd", "rd"],
            v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }
}
