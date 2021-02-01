import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {TokenValuesService} from '@app/_services/api/token-values.service';
import {CategoryService} from '@app/_services/api/category.service';
import {TokenValue,Category} from '@app/_models';

@Component({
  selector: 'app-token-values',
  templateUrl: './token-values.component.html',
  styleUrls: ['./token-values.component.scss']
})
export class TokenValuesComponent implements OnInit {
  tokenValueTable: FormGroup;
  formControl: FormArray;
  editedRows: FormGroup[];
  existingTokenValues: TokenValue[];
  categoryList: Category[];

  constructor(private formBuilder: FormBuilder, private tokenValueService: TokenValuesService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.populateCategories();
    this.tokenValueTable = this.formBuilder.group({
        categoryRows: this.fillRows()
    });
  }

  ngAfterOnInit(): void {
    this.formControl = this.getFormControls;

  }
  get getFormControls() {
    return this.tokenValueTable.get('categoryRows') as FormArray;
  }

  private populateCategories() {
    this.categoryService.getCategories().subscribe(categories =>
    this.categoryList = categories);
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
     for ( let i = 0; i < len; i++){
      tokenValuesFG.push(this.formBuilder.group({
      Category: this.categoryList.find(element => element.pk == this.existingTokenValues[i].category),
      Difficulty: this.existingTokenValues[i].difficulty,
      Value: this.existingTokenValues[i].value,
    }));
    }
     });

    return tokenValuesFG;
  }

  submitForm() {
    const formControl = this.getFormControls;
    this.editedRows = formControl.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.editedRows);
  }

}
