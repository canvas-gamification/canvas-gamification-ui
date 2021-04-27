import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    headers = ['A', 'B'];
    data = [
        [5, 'C'],
        [3, 'A'],
        [10, 'B']
    ];
    constructor() {
    }

    ngOnInit(): void {
    }

}
