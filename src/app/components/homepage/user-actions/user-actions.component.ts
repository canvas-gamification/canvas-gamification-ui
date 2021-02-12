import {Component, OnInit} from '@angular/core';
import {UserActionsService} from '@app/_services/api/user-actions.service';
import {Action} from '@app/_models';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {
  userActions: Action[];
  perPage = 25;
  currentPage: number;
  canChange: {next: boolean, prev: boolean};

  constructor(private userActionService: UserActionsService) {
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.userActionService
      .getUserActions({page: this.currentPage, page_size: this.perPage})
      ?.subscribe((paginatedActions) => {
        this.userActions = paginatedActions.results;
        this.canChange = {
          next: !!paginatedActions.next,
          prev: !!paginatedActions.previous
        };
      });
  }

  changePage(forward: boolean): void {
    const change = forward ? 1 : -1;
    this.userActionService
      .getUserActions({page: this.currentPage + change, page_size: this.perPage})
      ?.subscribe((paginatedActions) => {
        this.userActions = paginatedActions.results;
        this.currentPage = this.currentPage + change;
        this.canChange = {
          next: !!paginatedActions.next,
          prev: !!paginatedActions.previous
        };
      });
  }

  formatTokenChange(tokenChange): string {
    return `${tokenChange > 0 ? '+' : ''}${tokenChange.toFixed(2)}`;
  }
}
