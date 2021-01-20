import { Component, OnInit } from "@angular/core";
import { UserAction } from "@app/_models";
import { Action } from "@app/_models/action";
import { AuthenticationService } from "@app/_services/api/authentication";
import { UserActionsService } from "@app/_services/api/user-actions.service";

@Component({
  selector: "app-user-actions",
  templateUrl: "./user-actions.component.html",
  styleUrls: ["./user-actions.component.css"],
})
export class UserActionsComponent implements OnInit {
  userActions: Action[];

  constructor(
    private userActionService: UserActionsService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    let userId = this.authenticationService.currentUserValue?.id;
    console.log(userId);
    this.userActionService
      .getUserActions(userId)
      ?.subscribe((userActionSet) => {
        this.userActions = userActionSet.recentActions;
      });
  }
}
