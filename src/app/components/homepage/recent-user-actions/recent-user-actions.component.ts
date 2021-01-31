import {Component, OnInit} from '@angular/core';
import {Action} from '@app/_models/action';
import {UserActionsService} from '@app/_services/api/user-actions.service';

@Component({
  selector: 'app-recent-user-actions',
  templateUrl: './recent-user-actions.component.html',
  styleUrls: ['./recent-user-actions.component.css'],
})
export class RecentUserActionsComponent implements OnInit {
  userActions: Action[];
  userActionsHtml: string[];

  constructor(
    private userActionService: UserActionsService,
  ) {
  }

  ngOnInit(): void {
    this.userActionService
      .getAllUserActions({recent: true})
      ?.subscribe((actions) => {
        this.userActions = actions;
        this.userActionsHtml = actions.map(action =>
          action.description + `<span class="float-right">${this.formatTokenChange(action.token_change)}</span>`
        );
      });
  }

  formatTokenChange(tokenChange): string {
    return `+${tokenChange.toFixed(2)}`;
  }
}
