import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {TokenValuesService} from '../../services/api/token-values.service';
import {CategoryService} from '../../services/api/category.service';
import {TokenValue} from '../../../models/token_value';

@Component({
  selector: 'app-token-values',
  templateUrl: './token-values.component.html',
  styleUrls: ['./token-values.component.css']
})
export class TokenValuesComponent implements OnInit {
  tokenValueTable: FormGroup;
  formControl: FormArray;
  editedRows: any;
  difficulties: string[];

  constructor(private formBuilder: FormBuilder, private tokenValueService: TokenValuesService, private categoryService: CategoryService) {
    this.difficulties = ['EASY', 'MEDIUM', 'HARD'];  // TODO: make this call the API and get the global difficulties
  }

  ngOnInit(): void {
    this.tokenValueTable = this.formBuilder.group({
      categoryRows: this.formBuilder.array([])
    });
    this.fillRows();
  }

  ngAfterOnInit(): void {
    this.formControl = this.getFormControls;

  }

  private fillRows() {
    // TODO: This is where we call the API and populate the table
  }

  get getFormControls() {
    const formControl = this.tokenValueTable.get('categoryRows') as FormArray;
    return formControl;
  }

  private emptyRow() {
    return this.formBuilder.group({
      Category: [''],
      Easy: [''],
      Medium: [''],
      Hard: [''],
      isEditable: [true]
    });
  }

  addRow() {
    const formControl =  this.getFormControls;
    formControl.push(this.emptyRow());
  }
  assignTokenValues(categoryId: number, difficulty: string){
    const category = this.categoryService.getCategory(categoryId);
    if (!category) { return; }
    if (!difficulty) { return; }
    let value = 0;
    if (difficulty === 'EASY') {
      value = 1;
    }
    else if (difficulty === 'MEDIUM') {
      value = 2;
    }
    else if (difficulty === 'HARD') {
      value = 3;
    }
    // TODO: Make the value display on the form it was called from
    // this.tokenValueService.addTokenValue( { category, difficulty, value} as TokenValue);
  }

  deleteRow(index: number) {
    const formControl =  this.getFormControls;
    formControl.removeAt(index);
  }

  submitForm() {
    const formControl = this.getFormControls;
    this.editedRows = formControl.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.editedRows);
  }

}
