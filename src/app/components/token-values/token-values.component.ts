import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormBuilder} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
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
