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

    // tslint:disable-next-line:prefer-const
    let tokenValuesFG;

    this.existingTokenValues.forEach( (tokenVal) => {
      tokenValuesFG.append(
        this.formBuilder.group({
      Category: tokenVal.category,
      Difficulty: tokenVal.difficulty,
      Value: tokenVal.value})
      );
    });

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
