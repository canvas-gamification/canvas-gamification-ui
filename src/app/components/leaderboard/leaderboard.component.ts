import { Component, OnInit } from '@angular/core';

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
  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.leaderboardService
    .getCategories()
    .subscribe((users) => {
      this.users = users;
    })
  }

}
