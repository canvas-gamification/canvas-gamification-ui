import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {DragulaService} from 'ng2-dragula';
import {forkJoin} from 'rxjs';
import {QuestionSubmission} from '@app/_models/questionSubmission';

@Component({
    selector: 'app-parsons-view-snippet',
    templateUrl: './parsons-view-snippet.component.html',
    styleUrls: ['./parsons-view-snippet.component.scss']
})
export class ParsonsViewSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    PARSONS_LINES = 'PARSONS_LINES';
    parsonLines: any[];
    parsonAnswerLines: any[];
    variables: any[];
    previousSubmissions: QuestionSubmission[];
    constructor(private questionService: QuestionService, private dragulaService: DragulaService) {
    }

    ngOnInit(): void {
        const previousSubmissionsObservble = this.questionService.getPreviousSubmissions(this.QuestionDetails.id);
        forkJoin([previousSubmissionsObservble])
            .subscribe(result => {
                this.previousSubmissions = result[0];
            });
        this.parsonLines = this.QuestionDetails.lines;
        this.variables = this.QuestionDetails.variables;
        this.dragulaService.createGroup(this.PARSONS_LINES, {
            direction: 'horizontal',
            copy: true,
            copySortSource: true,
        });
        this.dragulaService.over().subscribe((value) => {
        });
        this.dragulaService.drop().subscribe((value) => {
        });
    }

}
