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
  editedRows: FormGroup[];
  existingTokenValues: TokenValue[];

  constructor(private formBuilder: FormBuilder, private tokenValueService: TokenValuesService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.tokenValueTable = this.formBuilder.group({
        categoryRows: this.formBuilder.array([this.fillRows()])  // Fetch the already existing categories with token values
    });
  }

  ngAfterOnInit(): void {
    this.formControl = this.getFormControls;

  }
  get getFormControls() {
    const formControl = this.tokenValueTable.get('categoryRows') as FormArray;
    return formControl;
  }

  /**
   *
   * @private fillRows(): FormGroup
   * will return a formGroup with all the retrieved token values
   */
  private fillRows(): FormGroup{
    this.tokenValueService.getTokenValues().subscribe(tokenVals => {
     this.existingTokenValues = tokenVals as TokenValue[]; });

    const tokenValuesFG = this.formBuilder.group({});

    // tslint:disable-next-line:prefer-for-of
    for ( let i = 0; i < this.existingTokenValues.length; i++){
      tokenValuesFG.addControl('token_value', this.formBuilder.group({
      Category: this.existingTokenValues[i].category,
      Difficulty: [this.existingTokenValues[i].difficulty],
      Value: [this.existingTokenValues[i].value],
    }));
    }

    return tokenValuesFG;
  }

  private emptyRow(): FormGroup {
    return this.formBuilder.group({
      Category: [''],
      Difficulty: [''],
      Value: [''],
    });
  }

  submitForm() {
    const formControl = this.getFormControls;
    this.editedRows = formControl.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.editedRows);
  }

}
