import { Component, OnInit } from '@angular/core';
import {AdminService} from '@app/_services/api/admin.service';
import {User} from '@app/_models/user';
import {Question} from "@app/_models/question";
import {Category} from '@app/_models/category';

import {Course} from "@app/_models/course";

import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "rxjs";
import {FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {AdminForm} from "@app/_forms/admin.form";

import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    userList : User[];
    userCourseList : User[];
    categoryList: Category[];
    questionList: Question[];

    courseNamesList : Course[];

    questionsSource: MatTableDataSource<Question>;
    questionsLength: number;
    filterQueryString;
    formGroup: FormGroup;

    courseId: number;

    /**
     * Apply the filters to the problem-set.
     */
    paramChanged: Subject<{
        role: string;
        courseName: string;
    }> = new Subject<{
        role: string;
        courseName: string;

    }>();
    applyFilter(): void {
        this.filterQueryString = this.formGroup.value;
        this.update();
    }
    update(): void {
        const options = {
            ...this.filterQueryString,
        };
        this.paramChanged.next(options);
    }

    /**
     */

    constructor(private listUserService: AdminService,
                private authenticationService: AuthenticationService,
                private route: ActivatedRoute) {
        this.formGroup = AdminForm.createForm();
        this.paramChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe(options => {
            this.listUserService.getAllUser(options).subscribe(users => this.userList = users);
            this.listUserService.getAllCourseUser(options).subscribe(usersCourse => this.userCourseList = usersCourse);
        });
        this.courseId = this.route.snapshot.params.courseId;

    }

    ngOnInit(): void {
        this.listUserService.getAllUser().subscribe(users => this.userList = users);
        this.listUserService.getAllCourseUser().subscribe(usersCourse => this.userCourseList = usersCourse);
        this.listUserService.getCategory().subscribe(category => this.categoryList = category);
        this.listUserService.getQuestion().subscribe(paginatedQuestions => {
            this.questionList = paginatedQuestions.results;
            this.questionsSource = new MatTableDataSource<Question>(this.questionList);
            this.questionsLength = paginatedQuestions.count;
        });

        this.listUserService.getCourseNames().subscribe(courseNames => this.courseNamesList = courseNames);


    }

}
