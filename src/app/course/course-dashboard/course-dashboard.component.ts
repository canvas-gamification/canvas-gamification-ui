import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute} from '@angular/router';
import {Course, CourseRegistration, User, CourseRegistrationData, UQJ, Question} from '@app/_models';
import {CourseDashboardService} from "@app/course/_services/course-dashboard.service";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";
import {AbstractControl, FormGroup} from "@angular/forms";
import {CourseDashboardForm} from "@app/course/_forms/course-dashboard.form";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {CourseService} from "@app/course/_services/course.service";
import {Subject} from "rxjs";
import {Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {QuestionReportService} from "@app/course/_services/question-report.service";
import {QuestionReport} from "@app/_models/question_report";
import {QuestionService} from "@app/problems/_services/question.service";
import {UqjService} from "@app/problems/_services/uqj.service";

@Component({
    selector: 'app-course-dashboard',
    templateUrl: './course-dashboard.component.html',
    styleUrls: ['./course-dashboard.component.scss']
})


export class CourseDashboardComponent implements OnInit {
    formGroup: FormGroup;
    courseId: number;
    userId: number;
    uqjs: UQJ[];
    user: User;
    course: Course;
    categoryList: string[] = [];
    registrationList: CourseRegistration[];
    courseSource: MatTableDataSource<Course>;
    reportsSource: MatTableDataSource<QuestionReport>;
    uqjsSource: MatTableDataSource<UQJ>;
    questionSource: MatTableDataSource<Question>;
    registrationsSource: MatTableDataSource<CourseRegistration>;
    favorite: number;
    category: {[key:string]: number} = {}
    category1: {[key:string]: number} = {}
    countFavoriteList: {[key:number]: number} = {};
    displayedColumns: string[] = ['username', 'name', 'status', 'action'];
    displayedColumnsReport: string[] = ['reportId', 'reportOption', 'reportDetails', 'question'];
    displayedColumnsFavorite: string[] = ['questionId', 'title', 'percentage'];
    // Sorting
    ordering: string;

    //Filtering
    filterQueryString;

    paramChanged: Subject<{
        name: string;
        username: string;
        ordering: string
    }> = new Subject<{
        name: string;
        username: string;
        ordering: string
    }>();

    constructor(private authenticationService: AuthenticationService,
                private courseDashboardService: CourseDashboardService,
                private courseService: CourseService,
                private questionReportService: QuestionReportService,
                private questionService: QuestionService,
                private uqjService: UqjService,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,
                private route: ActivatedRoute) {
        this.formGroup = CourseDashboardForm.createForm();
        this.authenticationService.currentUser.subscribe(user => this.user = user);
        this.courseId = this.route.snapshot.params.courseId;
        this.paramChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe(options => {
            this.courseDashboardService.getCourseUsersFilter(this.courseId, options).subscribe(registrations => {
                this.registrationList = registrations;
                this.registrationsSource = new MatTableDataSource(this.registrationList);

            });
        });
    }

    ngOnInit(): void {
        this.courseService
            .getCourse(this.courseId)
            .subscribe(course => {
                this.course = course;
            });

        this.courseDashboardService
            .getCourseUsers(this.courseId)
            .subscribe(registrations => {
                this.registrationList = registrations;
                this.registrationsSource = new MatTableDataSource(this.registrationList);
            });
        this.courseId = +this.route.snapshot.paramMap.get('courseId') || null;

        this.courseService.getCourse(this.courseId).subscribe(response => {
            const questionIdList = [];
            const tempReports = [];
            const tempUqjs = [];
            const tempQuestions = [];
            const tempCategories : {[key:string]: number} = {};
            response.uqjs.forEach(uqj => {
                questionIdList.push(uqj.question.id);
            });

            this.questionReportService.getReports().subscribe(results => {
                results.forEach(report => {
                    if (questionIdList.includes(report.question)) {
                        tempReports.push(report);
                        console.log("pushing to array");
                    }
                });
                this.reportsSource = new MatTableDataSource(tempReports);
            });

            this.uqjService.getAllUQJByQuestion().subscribe(uqjs => {
                uqjs.forEach(uqj => {
                    if (questionIdList.includes(uqj.question.id)) {
                        tempUqjs.push(uqj);
                    }
                });
                this.uqjsSource = new MatTableDataSource(tempUqjs);
            });

            this.questionService.getQuestions().subscribe(response => {
                response.results.forEach(question => {
                    if (questionIdList.includes(question.id)){
                        this.getFavoriteCount(question.id);
                        this.getFavoriteCount1(question.id);
                        tempQuestions.push(question);
                        if (tempCategories[question.category_name] == undefined){
                            tempCategories[question.category_name] = 1;
                            this.categoryList.push(question.category_name);
                        }
                        else{
                            tempCategories[question.category_name]++;
                        }

                    }
                });
                console.log(tempCategories);
                this.category = tempCategories;
                this.questionSource = new MatTableDataSource(tempQuestions);

            });

        });
    }


    /**
     * Update the current view of the course-dashboard.
     */
    update()
        :
        void {
        const options = {
            ...this.filterQueryString,
            ordering: this.ordering,
        };
        this.paramChanged.next(options);
    }


    /**
     * Helper method for sorting the canvascourseregistration objects.
     * @param sort - The current sort state.
     */
    sortData(sort
                 :
                 Sort
    ):
        void {
        if (sort.direction === 'asc'
        ) {
            this.ordering = sort.active;
        } else if (sort.direction === 'desc') {
            this.ordering = '-' + sort.active;
        } else {
            this.ordering = '';
        }
        this.update();
    }

    /**
     * Apply the filters to the canvascourseregistration objects.
     */
    applyFilter()
        :
        void {
        this.filterQueryString = this.formGroup.value;
        this.update();
    }


    /**
     * Method to get the form controls.
     */
    get form()
        :
        {
            [p
                :
                string
                ]:
                AbstractControl} {
        return this.formGroup.controls;
    }

    /**
     * Update status of one user.
     * @param registrationId - The canvascourseregistration object's id.
     * @param status - Status to change to.
     */
    changeStatus(registrationId
                     :
                     number, status
                     :
                     string
    ):
        void {
        const data
            :
            CourseRegistrationData = {id: registrationId, status: status};
        this.courseDashboardService.updateStatus(data)
            .subscribe(() => {
                this.notificationsService
                    .show('The status has been changed successfully.', {
                        status: TuiNotification.Success
                    }).subscribe();
                this.update();
            });
    }

    /**
     * Create a user
     * @param username - username of the desired user
     */
    registerUser(username
                     :
                     string
    ):
        void {
        const data
            :
            CourseRegistrationData = {username: username};
        this.courseDashboardService.registerUser(data, this.courseId)
            .subscribe(() => {
                this.notificationsService
                    .show('The student has been registered.', {
                        status: TuiNotification.Success
                    }).subscribe();
                this.update();
            });
    }

    getFavoriteCount(questionId: number): void {
        this.questionService.countFavorite(questionId).subscribe(result => {
            this.favorite = result;
            this.countFavoriteList[questionId] = result;
        });
    }

    getFavoriteCount1(questionId: number): void {
        this.questionService.countFavorite(questionId).subscribe(result => {
            this.favorite = result;
            this.questionService.getQuestions().subscribe(questions =>{
                questions.results.forEach(question =>{
                    if (questionId == question.id && this.category1[question.category_name] == undefined){
                        this.category1[question.category_name] = result;
                        console.log("test");
                    }
                    else if  (questionId == question.id && this.category1[question.category_name] != undefined){
                        this.category1[question.category_name] += result;
                    }
                });
            });
            console.log(this.category1);
        });
    }
}

