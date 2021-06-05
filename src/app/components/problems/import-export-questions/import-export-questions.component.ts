import {Component, OnInit} from '@angular/core';
import {QuestionService} from "@app/_services/api/question.service";
import {Question} from "@app/_models";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "@app/_services/api/category.service";
import {DifficultyService} from "@app/_services/api/problem/difficulty.service";

@Component({
    selector: 'app-import-export-questions',
    templateUrl: './import-export-questions.component.html',
    styleUrls: ['./import-export-questions.component.scss']
})
export class ImportExportQuestionsComponent implements OnInit {
    private parsedQuestions : Question[];
    jsonUri: SafeUrl;
    filename: string;

    constructor(private toastr: ToastrService,
                private questionService: QuestionService,
                private categoryService: CategoryService,
                private difficultyService: DifficultyService,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {

        this.filename = '';
        this.questionService.getQuestions().subscribe((result) => {
            this.generateJSONURI({
                filename: 'questions.json',
                text: JSON.stringify(result)
            });
        });
    }

    private generateJSONURI(arg: {
        filename: string,
        text: string
    }) {
        this.filename = arg.filename;
        this.jsonUri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(arg.text));
    }

    onFileChanged(target: EventTarget): void {
        const selectedFile = (<HTMLInputElement>target).files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(selectedFile, "UTF-8");
        fileReader.onload = () => {
            if (typeof fileReader.result === "string") {
                this.parsedQuestions = JSON.parse(fileReader.result);
            }
        };
        fileReader.onerror = (error) => {
            console.log(error);
            this.toastr.error('Error occurred while reading file');
        };
    }

    uploadQuestions() : void{
        console.log(this.parsedQuestions);
    }
}
