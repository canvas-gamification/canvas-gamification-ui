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

    readonly gradeX = ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
    readonly gradeY = ['0', '5', '10' ,'15', '20'];

    readonly gradeDistr = [
        [0, 0, 2, 5, 13, 14, 10, 20, 15, 5, 1]
    ];

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
            pageView:'123',
            lastActive: 'Jan. 6, 2022',
            submission: '22',
            missing: '4',
            score: '85.3%',
            categoryStruggling: 'OOP, loop'

        },
        {
            name: 'Jane Doe',
            riskType: 'Dropout',
            pageView:'33',
            lastActive: 'Dec. 22, 2022',
            submission: '8',
            missing: '18',
            score: '56.4%',
            categoryStruggling: 'Basics, method, OOP, loop'
        },
        {
            name: 'Alex Inkin',
            riskType: 'Struggling',
            pageView:'231',
            lastActive: 'Jan. 6, 2022',
            submission: '26',
            missing: '1',
            score: '66.5%',
            categoryStruggling: 'OOP, loop'
        },
        {
            name: 'Roman Sedov',
            pageView:'123',
            lastActive: 'Jan. 6, 2022',
            submission: '22',
            missing: '4',
            score: '85.3%',
            categoryStruggling: 'OOP, loop'
        }
    ];

    readonly atRiskStudents = [
        {
            name: 'Jane Doe',
            riskType: 'Dropout',
            pageView:'33',
            lastActive: 'Dec. 22, 2022',
            submission: '8',
            missing: '18',
            score: '56.4%',
            categoryStruggling: 'Basics, method, OOP, loop'
        },
        {
            name: 'Alex Inkin',
            riskType: 'Struggling',
            pageView:'231',
            lastActive: 'Jan. 6, 2022',
            submission: '26',
            missing: '1',
            score: '66.5%',
            categoryStruggling: 'OOP, loop'
        },
    ];

    readonly atRiskCol = Object.keys(this.atRiskStudents[0]);

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
