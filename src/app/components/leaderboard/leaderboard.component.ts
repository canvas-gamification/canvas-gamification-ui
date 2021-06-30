import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LeaderboardService} from '@app/_services/api/leaderboard.service';
import {TestModel} from '@app/_models/test_model';
import { LeaderBoard } from '@app/_models';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  leaderBoard: LeaderBoard;
  leaderBoardId: number;
  value = "Hello World!";
  users: TestModel[];
  topThree : TestModel[] = Array();
  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.leaderboardService
    .getLeaderBoard(this.leaderBoardId)
    .subscribe(course =>{
        this.leaderBoard = course;
    });
    // .subscribe((users) => {
    //   console.log(users);
    //   this.users = users.sort((a, b) => {
    //     if(a.tokens < b.tokens){
    //       return 1;
    //     }
    //     if(a.tokens > b.tokens){
    //       return -1;
    //     }
    //     return 0;
    //   });

    //   for(let i = 0; i < 3; i++) {
    //     this.topThree.push(this.users.shift());
        
    //   }
    // })
  }

turnToGif(e: Event) : void {
  let parent = e.target as HTMLElement;
  if(parent.children[2].children[0]){
    let img = parent.children[2].children[0].children[0] as HTMLImageElement;
    let fire: String = window.location.origin + '/assets/gif/fire-still.png';
    let snow: String = window.location.origin + '/assets/gif/snow-still.png';
    console.log(fire);
    console.log(img.src);
    if(img.src == fire){
      img.src = 'assets/gif/fire.gif';
    }
    else if(img.src == snow) {
      img.src = 'assets/gif/snow.gif';
    }
  }
}

turnToStatic(e: Event) : void {
  let parent = e.target as HTMLElement;
  if(parent.children[2].children[0]){
    let img = parent.children[2].children[0].children[0] as HTMLImageElement;
    let fire: String = window.location.origin + '/assets/gif/fire.gif';
    let snow: String = window.location.origin + '/assets/gif/snow.gif';
    if(img.src == fire){
      img.src = 'assets/gif/fire-still.png';
    }
    else if(img.src == snow) {
      img.src = 'assets/gif/snow-still.png';
    }
  }
}




}
