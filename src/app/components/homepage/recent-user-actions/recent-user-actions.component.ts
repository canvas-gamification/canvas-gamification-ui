import {Component, OnInit} from '@angular/core';
import {Action} from '@app/_models/action';
import {UserActionsService} from '@app/_services/api/user-actions.service';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-recent-user-actions',
    templateUrl: './recent-user-actions.component.html',
    styleUrls: ['./recent-user-actions.component.scss'],
})
export class RecentUserActionsComponent implements OnInit {
    userActions: Action[];

    constructor(
        private userActionService: UserActionsService,
        public sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.userActionService
            .getUserActions({recent: true, pageSize: 5})
            ?.subscribe((paginatedActions) => {
                this.userActions = paginatedActions.results;
            });
    }

    formatTokenChange(tokenChange: number): string {
        return `${tokenChange > 0 ? '+' : ''}${tokenChange.toFixed(2)}`;
    }
}
