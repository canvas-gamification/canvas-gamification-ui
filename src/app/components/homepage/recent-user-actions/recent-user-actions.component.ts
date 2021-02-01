import {Component, OnInit} from '@angular/core';
import {Action} from '@app/_models/action';
import {UserActionsService} from '@app/_services/api/user-actions.service';

@Component({
  selector: 'app-recent-user-actions',
  templateUrl: './recent-user-actions.component.html',
  styleUrls: ['./recent-user-actions.component.scss'],
})
export class RecentUserActionsComponent implements OnInit {
  userActions: Action[];

  constructor(
    private userActionService: UserActionsService,
  ) {
  }

  ngOnInit(): void {
    this.userActionService
      .getUserActions({recent: true})
      ?.subscribe((actions) => {
        this.userActions = actions.slice(0, 5);
      });
  }

  formatTokenChange(tokenChange): string {
    return `${tokenChange > 0 ? '+' : ''}${tokenChange.toFixed(2)}`;
  }
}
