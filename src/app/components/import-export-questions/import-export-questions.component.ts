import {Component, OnInit} from '@angular/core';
import {QuestionService} from "@app/_services/api/question.service";
import {Question} from "@app/_models";

@Component({
    selector: 'app-import-export-questions',
    templateUrl: './import-export-questions.component.html',
    styleUrls: ['./import-export-questions.component.scss']
})
export class ImportExportQuestionsComponent implements OnInit {
    private parsedQuestions : Question[];
    private elem = {
        element: {
            dynamicDownload: null as HTMLElement
        }
    }

    constructor(private questionService: QuestionService) {
    }

    ngOnInit(): void {
        console.log('');
    }

    downloadJson(): void {
        this.questionService.getQuestions().subscribe((result) => {
            this.downloadHTMLTag({
                fileName: 'questions.json',
                text: JSON.stringify(result)
            });
        });
    }

    private downloadHTMLTag(arg: {
        fileName: string,
        text: string
    }) {
        if (!this.elem.element.dynamicDownload) {
            this.elem.element.dynamicDownload = document.createElement('a');
        }
        const element = this.elem.element.dynamicDownload;
        const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
        element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
        element.setAttribute('download', arg.fileName);
        element.dispatchEvent(new MouseEvent("click"));
    }

    onFileChanged(target: EventTarget): void {
        const selectedFile = (<HTMLInputElement>target).files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(selectedFile, "UTF-8");
        fileReader.onload = () => {
            if (typeof fileReader.result === "string") {
                this.parsedQuestions = JSON.parse(fileReader.result);
            }
        }
        fileReader.onerror = (error) => {
            console.log(error);
        }
    }

    uploadQuestions() : void{
        console.log(this.parsedQuestions);
    }
}
