import {Component, Input, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

    @Input() data: object[][];
    @Input() headers: string[];

    sortedData: object[];

    constructor() {
    }

    ngOnInit(): void {
        if (this.data){
            this.sortedData = [];
            for (const element of this.data){
                const newRow = {};
                for (let i = 0; i < element.length; i++){
                    console.log(element[i]);
                    newRow['col' + i] = element[i];
                }
                this.sortedData.push(newRow);
            }
        }
    }
    sortData(sort: Sort){
        const tempData = this.sortedData.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedData = tempData;
            return;
        }
        console.log(sort.active);
        this.sortedData = tempData.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            return this.compare(a[sort.active], b[sort.active], isAsc);
        });
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
