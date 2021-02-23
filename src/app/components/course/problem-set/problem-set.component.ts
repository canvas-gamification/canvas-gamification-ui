import {Component, OnInit} from '@angular/core';
import {faEye, faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Question} from '@app/_models';
import {QuestionService} from '@app/_services/api/question.service';

@Component({
  selector: 'app-problem-set',
  templateUrl: './problem-set.component.html',
  styleUrls: ['./problem-set.component.scss']
})
export class ProblemSetComponent implements OnInit {
  FormData: FormGroup;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  questions: Array<Question>;

  constructor(private builder: FormBuilder, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(paginatedQuestions => this.questions = paginatedQuestions.results);

    this.FormData = this.builder.group({
      query: new FormControl(''),
      difficulty: new FormControl(''),
      category: new FormControl(''),
      status: new FormControl(''),
      sample: new FormControl('')
    });
  }
}
