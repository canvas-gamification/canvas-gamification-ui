import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '@app/_services/api/question.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MessageService} from '@app/_services/message.service';

@Component({
    selector: 'app-problem-create',
    templateUrl: './problem-create.component.html',
    styleUrls: ['./problem-create.component.scss']
})
export class ProblemCreateComponent implements OnInit {
    private routeSub: Subscription;
    MCQFormData: FormGroup;
    JavaFormData: FormGroup;
    ParsonsFormData: FormGroup;
    questionType: string;

    constructor(private route: ActivatedRoute,
                private questionService: QuestionService,
                private formBuilder: FormBuilder,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.questionType = params.type;
        });

        if (this.questionType === 'MCQ') {
            this.MCQFormData = this.formBuilder.group({
                title: new FormControl(''),
                difficulty: new FormControl(''),
                category: new FormControl(''),
                course_name: new FormControl(''),
                event_name: new FormControl(''),
                text: new FormControl(''),
                answer: new FormControl(''),
                visible_distractor_count: new FormControl('3')
            });
        }
        if (this.questionType === 'java') {
            this.JavaFormData = this.formBuilder.group({
                title: new FormControl(''),
                difficulty: new FormControl(''),
                category: new FormControl(''),
                course_name: new FormControl(''),
                event_name: new FormControl(''),
                text: new FormControl(''),
                junit_template: new FormControl(''),
                input_file_names: new FormControl(''),
            });
        }
        if (this.questionType === 'parsons') {
            this.ParsonsFormData = this.formBuilder.group({
                title: new FormControl(''),
                difficulty: new FormControl(''),
                category: new FormControl(''),
                course_name: new FormControl(''),
                event_name: new FormControl(''),
                text: new FormControl(''),
                junit_template: new FormControl(''),
                lines: new FormControl(''),
                additional_file_name: new FormControl(''),
            });
        }
    }

    onSubmit(FormData) {
        // Post Question for Create
    }
}
