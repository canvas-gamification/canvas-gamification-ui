import {Component, OnInit} from '@angular/core';
import {Action} from '@app/_models/action';
import {AuthenticationService} from '@app/_services/api/authentication';
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
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    const userId = this.authenticationService.currentUserValue?.id;
    this.userActionService
      .getUserActions(userId, {recent: true})
      ?.subscribe((userAction) => {
        this.userActions = userAction.actions;
        this.userActionsHtml = userAction.actions.map(action =>
          action.description + `<span class="float-right">${this.formatTokenChange(action.token_change)}</span>`
        );
      });
  }

  formatTokenChange(tokenChange): string {
    return `+${tokenChange.toFixed(2)}`;
  }
}
