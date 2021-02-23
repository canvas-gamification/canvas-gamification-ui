import {Component, OnInit} from '@angular/core';
import {faEye, faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Question} from '@app/_models';
import {QuestionService} from '@app/_services/api/question.service';
import {PageEvent} from '@angular/material/paginator';

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

  // Pagination
  questionsLength: number;
  pageSize: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private builder: FormBuilder, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.initialize();

    this.FormData = this.builder.group({
      query: new FormControl(''),
      difficulty: new FormControl(''),
      category: new FormControl(''),
      status: new FormControl(''),
      sample: new FormControl('')
    });
  }

  initialize(): void {
    this.questionService.getQuestions().subscribe( paginatedQuestions => {
      this.questionsLength = paginatedQuestions.count;
      this.pageSize = paginatedQuestions.results.length;
      this.questions = paginatedQuestions.results;
    });
  }

  update(event: PageEvent): void {
    this.questionService.getQuestions({
      page: event.pageIndex + 1,
      page_size: event.pageSize
    }).subscribe(paginatedQuestions => {
      this.questions = paginatedQuestions.results;
    });
  }
}
