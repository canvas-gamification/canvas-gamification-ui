import {Injectable} from '@angular/core';
import {ApiService} from "@app/_services/api.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category, Question} from "@app/_models";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {QuestionService} from "@app/_services/api/question.service";
import {CategoryService} from "@app/_services/api/category.service";

@Injectable({
    providedIn: 'root'
})
export class ImportExportService {
    private categories: Category[];

    constructor(private http: HttpClient,
                private apiService: ApiService,
                private questionService: QuestionService,
                private categoryService: CategoryService,
                private toastr: ToastrService) {

        this.categoryService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    downloadAllQuestions(options?: {
        search: string,
        parentCategory: string,
        subCategory: string,
        difficulty: string,
        is_sample: string,
        ordering: string
    }): Observable<Question[]> {
        const url = this.apiService.getURL('questions', 'download-questions');
        const {
            search = '',
            parentCategory = '',
            subCategory = '',
            difficulty = '',
            is_sample: isSample = '',
            ordering = '',
        } = options ? options : {};
        const params = new HttpParams()
            .set('search', search)
            .set('category__parent__name', parentCategory)
            .set('category__name', subCategory)
            .set('difficulty', difficulty)
            .set('is_sample', isSample)
            .set('ordering', ordering);

        return this.http.get<Question[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<Question[]>('Error occurred while fetching questions for download')));
    }

    uploadMCQuestion(question: Question): void {
        const eventId = (typeof question.event === 'number') ? question.event : question.event?.id;
        const input = {
            title: question.title,
            difficulty: question.difficulty,
            course: question.course_name,
            event: (String(eventId) === 'undefined') ? null : String(eventId),
            text: question.text,
            answer: question.answer,
            category: String(this.categories.filter(x => x.pk === question.category)[0].pk),
            variables: question.variables,
            visible_distractor_count: question.visible_distractor_count,
            choices: question.choices
        };
        this.questionService.postMultipleChoiceQuestion(input).subscribe((result) => {
            if (result.success != false)
                this.toastr.success('The Question has been added Successfully.');
        });
    }

    uploadParsonsQuestion(question: Question): void {
        const eventId = (typeof question.event === 'number') ? question.event : question.event?.id;
        const input = {
            title: question.title,
            difficulty: question.difficulty,
            course: question.course_name,
            event: (String(eventId) === 'undefined') ? null : String(eventId),
            text: question.text,
            category: String(this.categories.filter(x => x.pk === question.category)[0].pk),
            variables: question.variables,
            lines: question.lines,
            additional_file_name: question.additional_file_name,
            junit_template: question.junit_template
        };
        this.questionService.postParsonsQuestion(input).subscribe((result) => {
            if (result.success != false)
                this.toastr.success('The Question has been added Successfully.');
        });
    }

    uploadJavaQuestion(question: Question): void {
        const eventId = (typeof question.event === 'number') ? question.event : question.event?.id;
        const input = {
            title: question.title,
            difficulty: question.difficulty,
            course: question.course_name,
            event: (String(eventId) === 'undefined') ? null : String(eventId),
            text: question.text,
            category: String(this.categories.filter(x => x.pk === question.category)[0].pk),
            variables: question.variables,
            junit_template: question.junit_template,
            input_file_names: question.input_file_names
        };
        this.questionService.postJavaQuestion(input).subscribe((result) => {
            if (result.success != false)
                this.toastr.success('The Question has been added Successfully.');
        });
    }
}
