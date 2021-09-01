import {Component, OnInit} from '@angular/core';
import {UserActionsService} from '@app/_services/api/user-actions.service';
import {Action} from '@app/_models';
import {MatTableDataSource} from "@angular/material/table";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
    selector: 'app-user-actions',
    templateUrl: './user-actions.component.html',
    styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {
    userActions: Action[];
    actionsSource: MatTableDataSource<Action>;

    // Pagination
    actionsLength: number;
    pageSize: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    pageEvent: PageEvent;

    // Sorting
    ordering: string;

    paramChanged: Subject<{
        page: number,
        page_size: number,
        ordering: string
    }> = new Subject<{
        page: number,
        page_size: number,
        ordering: string
    }>();
    displayedColumns: string[] = ['id', 'description', 'object_type', 'status', 'time_created', 'verb', 'tokens'];

    constructor(private userActionService: UserActionsService) {
        this.paramChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe(options => {
            this.userActionService.getUserActions(options).subscribe((paginatedActions) => {
                this.userActions = paginatedActions.results;
                this.actionsSource = new MatTableDataSource(this.userActions);
                this.actionsLength = paginatedActions.count;
            });
        });
    }

    ngOnInit(): void {
        this.userActionService.getUserActions().subscribe(paginatedActions => {
            this.actionsLength = paginatedActions.count;
            this.pageSize = paginatedActions.results.length;
            this.userActions = paginatedActions.results;
            this.actionsSource = new MatTableDataSource(this.userActions);
        });
    }

    /**
     * A function to format the change in tokens to the proper decimal format.
     * @param tokenChange - The tokenChange value.
     */
    formatTokenChange(tokenChange: number): string {
        return `${tokenChange > 0 ? '+' : ''}${tokenChange.toFixed(2)}`;
    }

    getRouterLink(link: string): string {
        // FIXME: Make this not trash. Change how actions are stored in DB
        const linkMatch = link.match(/href='([^']*)/)[1].split('/').splice(-2)[0];
        const questionName = link.replace(/(<([^>]+)>)/gi, '').split(' ').splice(-2).join(' ');
        return `<a href="problem/${linkMatch}">${questionName}</a>`;
    }

    /**
     * Helper method for sorting the user actions.
     * @param sort - The current sort state.
     */
    sortData(sort: Sort): void {
        if (sort.direction === 'asc') {
            this.ordering = sort.active;
        } else if (sort.direction === 'desc') {
            this.ordering = '-' + sort.active;
        } else {
            this.ordering = '';
        }
        this.update();
    }

    /**
     * Update the current view of the user actions page.
     */
    update(): void {
        const options = {
            ...(this.pageEvent && {
                page: this.pageEvent.pageIndex + 1,
                page_size: this.pageEvent.pageSize,
            }),
            ordering: this.ordering,
        };
        console.log(options);
        this.paramChanged.next(options);
    }

    /**
     * New page for the user actions table.
     * @param event
     */
    newPageEvent(event: PageEvent): void {
        this.pageEvent = event;
        this.update();
    }
}
