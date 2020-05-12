import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Question} from '../../models/question';

@Component({
  selector: 'app-problem-set',
  templateUrl: './problem-set.component.html',
  styleUrls: ['./problem-set.component.css']
})
export class ProblemSetComponent implements OnInit {

  questions: Question[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getQuestions().subscribe(questions => this.questions = questions);
  }

}
