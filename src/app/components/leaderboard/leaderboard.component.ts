import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LeaderboardService} from '@app/_services/api/leaderboard.service';
import {TestModel} from '@app/_models/test_model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  value = "Hello World!";
  users: TestModel[];
  topThree : TestModel[] = Array();
  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.leaderboardService
    .getCategories()
    .subscribe((users) => {
      console.log(users);
      this.users = users.sort((a, b) => {
        if(a.tokens < b.tokens){
          return 1;
        }
        if(a.tokens > b.tokens){
          return -1;
        }
        return 0;
      });

      for(let i = 0; i < 3; i++) {
        this.topThree.push(this.users.shift());
        
      }
    })
  }

  onClick(): void {
    console.log("clicked");
  }

//  animate(){
//  animateRow = document.getElementsByClassName("animate");
//   var i;
//   for (i =0; i < animateRow.length; i++){
//       animateRow[i].addEventListener("mouseover", function(){
//       document.getElementById("fireStill").src="assets/gif/icons8-fire.gif";
//     })
//       animateRow[i].addEventListener("mouseleave", function(){
//       document.getElementById("fireStill").src="img src='assets/gif/fire-still.jpg";
//     })
//   }
//  }

 turnToGif(){
      document.getElementById("fireStill").src="assets/gif/icons8-fire.gif";
 }
 

 turnToStatic(){
   document.getElementById("fireStill").src="img src='assets/gif/fire-still.jpg";
 }


}
