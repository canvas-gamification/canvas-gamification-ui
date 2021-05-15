import {Component, OnInit} from '@angular/core';
import {UserActionsService} from '@app/_services/api/user-actions.service';
import {Action} from '@app/_models';

@Component({
    selector: 'app-user-actions',
    templateUrl: './user-actions.component.html',
    styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {
    userActions: Action[];
    perPage = 25;
    currentPage: number;
    canChange: { next: boolean, prev: boolean };

    constructor(private userActionService: UserActionsService) {
        this.currentPage = 1;
    }

    ngOnInit(): void {
        this.userActionService
            .getUserActions({page: this.currentPage, pageSize: this.perPage})
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
            .getUserActions({page: this.currentPage + change, pageSize: this.perPage})
            ?.subscribe((paginatedActions) => {
                this.userActions = paginatedActions.results;
                this.currentPage = this.currentPage + change;
                this.canChange = {
                    next: !!paginatedActions.next,
                    prev: !!paginatedActions.previous
                };
            });
    }

    formatTokenChange(tokenChange : number): string {
        return `${tokenChange > 0 ? '+' : ''}${tokenChange.toFixed(2)}`;
    }

    getRouterLink(link : string): string {
        // FIXME: Make this not trash. Change how actions are stored in DB
        const linkMatch = link.match(/href='([^']*)/)[1].split('/').splice(-2)[0];
        const questionName = link.replace(/(<([^>]+)>)/gi, '').split(' ').splice(-2).join(' ');
        return `<a href="problem/${linkMatch}">${questionName}</a>`;
    }
}
