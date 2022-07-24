import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core'
import {UserActionsService} from '@app/_services/api/user-actions.service'
import {Action} from '@app/_models'
import {Subject} from "rxjs"
import {debounceTime, distinctUntilChanged} from "rxjs/operators"
import {TuiComparator} from "@taiga-ui/addon-table"
import {ActionsSortParameters} from "@app/_models/user_actions"

export type SortingKey =
    'id'
    | 'object_type'
    | 'status'
    | 'time_created'
    | 'verb'

@Component({
    selector: 'app-user-actions',
    templateUrl: './user-actions.component.html',
    styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit, AfterContentChecked {
    userActions: Action[] = []
    userActionsTableColumns: string[] = [
        'id', 'description', 'object_type', 'status', 'time_created', 'verb', 'token_change'
    ]

    // Sorting
    readonly sorters: Record<SortingKey, TuiComparator<Action>> = {
        id: () => 0,
        object_type: () => 0,
        status: () => 0,
        time_created: () => 0,
        verb: () => 0
    }
    sorter = this.sorters.id
    sortDirection: -1 | 1 = 1
    sortCategories: string[] = ['id', 'description', 'object_type', 'status', 'time_created', 'verb', 'token_change']

    // Pagination
    numberOfActions = 0
    pageSize = 10
    page = 0

    paramChanged: Subject<ActionsSortParameters> = new Subject<ActionsSortParameters>()
    loadingTable = false

    constructor(
        private userActionService: UserActionsService,
        private changeDetector: ChangeDetectorRef
    ) {
        this.paramChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe(options => {
            this.userActionService.getUserActions(options).subscribe(paginatedActions => {
                this.userActions = paginatedActions.results
                this.numberOfActions = paginatedActions.count
                this.loadingTable = false
            })
        })
    }

    ngOnInit(): void {
        this.userActionService.getUserActions(this.getOptions()).subscribe(paginatedActions => {
            this.numberOfActions = paginatedActions.count
            this.userActions = paginatedActions.results
        })
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges()
    }

    update(): void {
        this.loadingTable = true
        this.paramChanged.next(this.getOptions())
    }

    /**
     * Get the options required for the user actions get request
     */
    getOptions(): ActionsSortParameters {
        return {
            page: this.page + 1,
            page_size: this.pageSize,
            ordering: this.getOrdering()
        }
    }

    /**
     * Takes the current direction and sorter name and gets the order
     */
    getOrdering(): string {
        const filterCategory = this.sortCategories[this.userActionsTableColumns.indexOf(this.sorter.name)]
        return (this.sortDirection === -1 ? '-' : '') + filterCategory
    }
}
