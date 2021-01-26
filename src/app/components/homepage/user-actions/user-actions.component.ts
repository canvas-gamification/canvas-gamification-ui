import {Component, OnInit} from '@angular/core';
import {Action} from '@app/_models/action';
import {AuthenticationService} from '@app/_services/api/authentication';
import {UserActionsService} from '@app/_services/api/user-actions.service';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.css'],
})
export class UserActionsComponent implements OnInit {
  userActions: Action[];
  userActionsHtml: string[];

  constructor(
    private userActionService: UserActionsService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    const userId = this.authenticationService.currentUserValue?.id;
    console.log(userId);
    this.userActionService
      .getUserActions(userId)
      ?.subscribe((userActionSet) => {
        this.userActions = userActionSet.recentActions;

        this.userActionsHtml = userActionSet.recentActions.map(action =>
          action.description + `<span class="float-right">${this.formatTokenChange(action.token_change)}</span>`
        );
      });
  }

  formatTokenChange(tokenChange): string {
    return `+${tokenChange.toFixed(2)}`;
  }
}
