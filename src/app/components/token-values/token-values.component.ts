import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-token-values',
  templateUrl: './token-values.component.html',
  styleUrls: ['./token-values.component.css']
})
export class TokenValuesComponent implements OnInit {
  tokenValueTable: FormGroup;
  difficulties: string[]; // array for the columns

  constructor(private formBuilder: FormBuilder) {
    this.difficulties = ['EASY', 'MEDIUM', 'HARD'];
  }

  ngOnInit(): void {
    this.tokenValueTable = this.formBuilder.group({
      CategoryRows: this.formBuilder.array([this.fillRows()])
    });
  }

  get formArr() {
    return this.tokenValueTable.get('CategoryRows') as FormArray;
  }

  fillRows() {
    return this.formBuilder.group({
      Category: ['']
    });
  }

}
