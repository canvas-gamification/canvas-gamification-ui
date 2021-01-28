import {Component, OnInit} from '@angular/core';
import {UQJ} from '@app/_models/uqj';
import {AuthenticationService} from '@app/_services/api/authentication';
import {UqjService} from '@app/_services/api/uqj.service';

@Component({
  selector: 'app-recent-viewed-questions',
  templateUrl: './recent-viewed-questions.component.html',
  styleUrls: ['./recent-viewed-questions.component.css']
})
export class RecentViewedQuestionsComponent implements OnInit {
  uqjs: UQJ[];

  constructor(
    private uqjService: UqjService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    const userId = this.authenticationService.currentUserValue?.id;
    this.uqjService
      .getUserUQJs(userId, {recent: true})
      ?.subscribe((userUQJ) => {
        console.log("Really");
        this.uqjs = userUQJ.uqjSet;
      });
  }

}
