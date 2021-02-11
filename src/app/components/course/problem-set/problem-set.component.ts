import { Component, OnInit } from '@angular/core';
import {faEye, faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

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
  dataList: Array<Problem>;
  constructor(private builder: FormBuilder) {
  this.dataList = [
      {
        id: 1,
        name: 'Question 1',
        author: 'None',
        type: 'None',
        category: 'None',
        subCategory: 'Basics',
        difficulty: 'EASY',
        tokenValue: 1,
        avgSuccess: '0%'
      },
      {
        id: 2,
        name: 'Question 2',
        author: 'None',
        type: 'None',
        category: 'None',
        subCategory: 'Basics',
        difficulty: 'EASY',
        tokenValue: 1,
        avgSuccess: '0%'
      },
      {
        id: 3,
        name: 'Question 3',
        author: 'None',
        type: 'None',
        category: 'None',
        subCategory: 'Basics',
        difficulty: 'EASY',
        tokenValue: 1,
        avgSuccess: '0%'
      }
    ];
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      query: new FormControl(''),
      difficulty: new FormControl(''),
      category: new FormControl(''),
      status: new FormControl(''),
      sample: new FormControl()
    });
  }

}
export interface Problem {
  id: number;
  name: string;
  author: string;
  type: string;
  category: string;
  subCategory: string;
  difficulty: string;
  tokenValue: number;
  avgSuccess: string;
}
