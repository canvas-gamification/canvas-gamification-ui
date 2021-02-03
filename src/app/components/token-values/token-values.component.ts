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
  tokenIdList: number[];

  constructor(private formBuilder: FormBuilder, private tokenValueService: TokenValuesService, private categoryService: CategoryService) {
    this.tokenIdList = [];
    this.existingTokenValues = [];
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
    console.log(this.tokenIdList);
  }


  ngAfterOnInit(): void {
    this.formControl = this.getFormControls;
  }
  get getFormControls() {
    try {
      return this.tokenValueTable.get('categoryRows') as FormArray;
    }
    catch (e){
      console.log(e);
      return this.formBuilder.array([]);
    }
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
        Easy: this.getValueByDifficulty("EASY", category.pk),
        Medium: this.getValueByDifficulty("NORMAL", category.pk),
        Hard: this.getValueByDifficulty("HARD", category.pk),
        Token_Id: this.getIDByDifficulty("EASY", category.pk) + ' ' + this.getIDByDifficulty("NORMAL", category.pk)
          + ' ' + this.getIDByDifficulty("HARD", category.pk)
      }));
    });
    return tokenValuesFG;
  }

  private getValueByDifficulty(difficulty: string, categoryId: number) : number{
    try {
      const tokenVal = this.existingTokenValues.find(element => (element.difficulty === difficulty) && (element.category == categoryId));
      return tokenVal.value;
    }
    catch(e){
        console.log(e);
        return NaN;
      }
    }
  private getIDByDifficulty(difficulty: string, categoryId: number) : string{
    try {
      const tokenVal = this.existingTokenValues.find(element => (element.difficulty === difficulty) && (element.category == categoryId));
      return tokenVal.pk.toString();
    }
    catch(e){
      console.log(e);
      return "N/A";
    }
  }

  refresh(): void{
    window.location.reload();
  }

  submitForm() {
    const formControl = this.getFormControls;
    this.editedRows = formControl.controls.filter(row => row.touched).map(row => row.value);
    this.updateOrPushNewTokenValues(this.editedRows);
  }
  private updateOrPushNewTokenValues(editedRows): void{
    // TODO: If the value doesn't exist then instead of updating POST the value
    editedRows.forEach(row => {
      const rowValues = [row.Easy, row.Medium, row.Hard]; //TODO: Find a way to do this so it doesn't matter how many difficulties there are aka dynamic
      let tokenIds = row.Token_Id.split(" ");
      for(let i = 0; i < tokenIds.length; i++){
        const currentTokenValue = this.existingTokenValues.find(element => element.pk == +tokenIds[i]);
        if(currentTokenValue.value != rowValues[i]){
          currentTokenValue.value = rowValues[i];
          this.tokenValueService.updateTokenValue(currentTokenValue).subscribe();
        }
      }
    });
    this.refresh();
  }

}
