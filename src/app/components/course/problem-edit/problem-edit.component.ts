import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Question} from '@app/_models';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '@app/_services/api/question.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MessageService} from '@app/_services/message.service';

@Component({
  selector: 'app-problem-edit',
  templateUrl: './problem-edit.component.html',
  styleUrls: ['./problem-edit.component.scss']
})
export class ProblemEditComponent implements OnInit {
  FormData: FormGroup;
  private routeSub: Subscription;
  userId: number;
  QuestionDetails: Question;

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private formBuilder: FormBuilder,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.FormData = this.formBuilder.group({
      title: new FormControl(''),
      difficulty: new FormControl(''),
      category: new FormControl(''),
      course_name: new FormControl(''),
      event_name: new FormControl(''),
      text: new FormControl(''),
      // correctAnswer: new FormControl('')
      visible_distractor_count: new FormControl('3')
    });
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params.id;
    });
    this.questionService.getMultipleChoiceQuestion(this.userId).subscribe((details: Question) => {
      this.QuestionDetails = details;
      this.FormData.controls.title.setValue(this.QuestionDetails.title);
      this.FormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
      this.FormData.controls.category.setValue(this.QuestionDetails.category_name);
      this.FormData.controls.course_name.setValue(this.QuestionDetails.course_name);
      this.FormData.controls.event_name.setValue(this.QuestionDetails.event_name);
      this.FormData.controls.text.setValue(this.QuestionDetails.text);
      // this.FormData.controls.correctAnswer.setValue(this.QuestionDetails.correctAnswer);
    });
  }

  onSubmit(FormData) {
    this.questionService.putQuestion(FormData, this.userId)
      .subscribe(response => {
        this.messageService.addSuccess('The Question has been Updated Successfully.');
        console.log(response);
      }, error => {
        console.warn(error.responseText);
        console.log({error});
      });
  }

}
