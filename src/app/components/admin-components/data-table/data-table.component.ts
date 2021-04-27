import {Component, Input, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

    @Input() data: object[][];
    @Input() headers: string[];

    // Sorting
    /*
    ordering: string;
    pageEvent: PageEvent;
    */

    constructor() {
    }

    ngOnInit(): void {
    }
    sortData(sort: Sort){
        console.log('sort event');
    }
    // Copy pasting Carson sorting method
    /*
    sortData(sort: Sort) {
        if (sort.direction === 'asc') {
            this.ordering = sort.active;
        } else if (sort.direction === 'desc') {
            this.ordering = '-' + sort.active;
        } else {
            this.ordering = '';
        }
        this.update();
    }

    update(): void {
        const options = {
            ...(this.pageEvent && {
                page: this.pageEvent.pageIndex + 1,
                page_size: this.pageEvent.pageSize,
            }),
            ...this.filterQueryString,
            ordering: this.ordering,
        };
        this.paramChanged.next(options);
    }
    */
}
