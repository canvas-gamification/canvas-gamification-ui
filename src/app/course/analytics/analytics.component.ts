import {Component,  Input, OnInit} from '@angular/core';
import {Course} from "@app/_models";
import {ceil, TUI_DEFAULT_STRINGIFY, TuiContextWithImplicit, TuiStringHandler} from "@taiga-ui/cdk";
import {TuiPoint} from "@taiga-ui/core";
import {delay, filter, startWith, switchMap} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {Observable, of, Subject} from "rxjs";

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
    @Input() course: Course;
    readonly max = 100;
    readonly avgGrade = 84.67

     readonly grade = [
         [74, 66, 88, 78, 99]
     ];

    readonly labelsX = ['Assignment 1' , 'Midterm 1 ', 'Lab 2', 'Quiz 3', 'Final'];
    readonly labelsY = ['0', '25', '50' ,'75', '100'];

    readonly value = [
        [1, 50],
        [2, 75],
        [3, 50],
        [4, 150],
        [5, 155],
        [6, 190],
        [7, 90],
    ];

    readonly lineX = ['', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', ]
    readonly lineY = ['0', '50', '100' ,'150', '200']

    readonly hint: TuiStringHandler<TuiContextWithImplicit<TuiPoint>> = ({$implicit}) =>
        `Vertical: ${$implicit[1]}\nHorizontal: ${$implicit[0]}`;

    readonly stringify = TUI_DEFAULT_STRINGIFY;

    search = ""





    readonly items = [
        'Student',
        'Teacher',
    ];

    val = '';



    readonly students = [
        {
            name: 'John Doe',
            role: 'Teacher',
        },
        {
            name: 'Jane Doe',
            role: 'Student',
        },
        {
            name: 'Alex Inkin',
            role: 'Student',
        },
        {
            name: 'Roman Sedov',
            role: 'Student',
        }
    ];

    readonly columns = Object.keys(this.students[0]);

    readonly viewby = ['All Question', 'Event', 'Category']

    readonly questions = [
        {
            title: 'Java Question 1',
            category: 'Java',
            action: '',
        },
        {
            title: 'Java Question 2',
            category: 'Java',
            action: '',
        },
        {
            title: 'Parsons Question 1',
            category: 'Parsons',
            action: '',
        },
        {
            title: 'MCQ Question 1',
            category: 'MCQ',
            action: '',
        },
    ]

    readonly col = Object.keys(this.questions[0]);

    getHeight(max: number): number {
        return (max / ceil(max, -3)) * 100;
    }
    constructor() {}

    ngOnInit(): void {
    }

}
