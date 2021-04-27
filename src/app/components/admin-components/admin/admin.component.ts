import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    courseId: number;
    headers = ['A', 'B'];
    data = [
        [5, 'C'],
        [3, 'A'],
        [10, 'B']
    ];

    questionHeaders = ['Question Type', 'Number of Questions', 'Attempts', 'Correct', 'Success Rate'];
    questionData: object[][];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.courseId = +this.route.snapshot.paramMap.get('courseId') || null;
        this.questionData = [['Pizza', 3, 5, 3, 3 / 5]];
    }

}
