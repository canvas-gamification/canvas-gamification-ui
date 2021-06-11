import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {LeaderBoardService} from '@app/_services/api/leaderboard/leaderboard.service';
import {Course, User,leader_board} from '@app/_models';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-leader-board',
    templateUrl: './leader-board.component.html',
    styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {
    leader_board: leader_board;
    courseId: number;
    user: User;

    constructor(private authenticationService: AuthenticationService,
                private leaderBoardService: LeaderBoardService,
                private route: ActivatedRoute) {
        this.courseId = this.route.snapshot.params.courseId;
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        this.leaderBoardService
            .getCourse(this.courseId)
            .subscribe(leader_board => {
                this.courseId= this.courseId;
            });
    }
}