import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {TokenValuesService} from '../../_services/api/token-values.service';
import {CategoryService} from '../../_services/api/category.service';
import {TokenValue} from '../../_models/token_value';

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
        categoryRows: this.fillRows()  // Fetch the already existing categories with token values
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
  private fillRows(): FormArray{
    const tokenValuesFG = this.formBuilder.array([]);
    this.tokenValueService.getTokenValues().subscribe(tokenVals => {
     this.existingTokenValues = tokenVals;
     const len = this.existingTokenValues.length;
     // tslint:disable-next-line:prefer-for-of
     for ( let i = 0; i < len; i++){
      tokenValuesFG.push(this.formBuilder.group({
      Category: this.existingTokenValues[i].category,
      Difficulty: this.existingTokenValues[i].difficulty,
      Value: this.existingTokenValues[i].value,
    }));
    }
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
