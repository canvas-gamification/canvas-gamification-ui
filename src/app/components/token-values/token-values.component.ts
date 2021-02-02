import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormBuilder, FormControl} from '@angular/forms';
import {TokenValuesService} from '@app/_services/api/token-values.service';
import {CategoryService} from '@app/_services/api/category.service';
import {TokenValue,Category} from '@app/_models';
import {forkJoin} from 'rxjs';

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
    const tokenValuesObservable = this.tokenValueService.getTokenValues();
    const categoryObservable = this.categoryService.getCategories();
    forkJoin([tokenValuesObservable, categoryObservable]).subscribe(result => {
      this.existingTokenValues = result[0];
      this.categoryList = result[1];
      this.tokenValueTable = this.formBuilder.group({
        categoryRows: this.populateRows()
      });
    });
  }


  ngAfterOnInit(): void {
    this.formControl = this.getFormControls;

  }
  get getFormControls() {
    return this.tokenValueTable.get('categoryRows') as FormArray;
  }


  /**
   *
   * @private populateRows(): FormGroup
   * will return a formGroup with all the retrieved token values arranged based on difficulty
   */
  private populateRows(): FormArray{
    const tokenValuesFG = this.formBuilder.array([]);
    this.categoryList.forEach(category => {
      tokenValuesFG.push(this.formBuilder.group({
        Category_Name: new FormControl({value: category.name, disabled: true}),
        Easy: this.getValueByDifficulty("EASY"),
        Medium: this.getValueByDifficulty("NORMAL"),
        Hard: this.getValueByDifficulty("HARD")
      }));
    });
    return tokenValuesFG;
  }

  private getValueByDifficulty(difficulty: string) : number{
    const tokenVal = this.existingTokenValues.find(element => element.difficulty === difficulty).value;
    return (tokenVal === undefined)? 0 : tokenVal;
  }

  submitForm() {
    const formControl = this.getFormControls;
    this.editedRows = formControl.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.editedRows);
  }

}
