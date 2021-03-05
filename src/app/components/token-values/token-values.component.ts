import {Component, OnInit} from '@angular/core';
import {FormGroup, FormArray, FormBuilder, FormControl} from '@angular/forms';
import {TokenValuesService} from '@app/_services/api/token-values.service';
import {CategoryService} from '@app/_services/api/category.service';
import {TokenValue, Category} from '@app/_models';
import {forkJoin} from 'rxjs';
import {faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';

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
    topLevelCategoryList: Category[];
    tokenIdList: number[];
    expanded: {} = {};
    subCategories: {} = {};
    faCaretRight = faCaretRight;
    faCaretDown = faCaretDown;

    constructor(private formBuilder: FormBuilder, private tokenValueService: TokenValuesService, private categoryService: CategoryService) {
        this.tokenIdList = [];
        this.existingTokenValues = [];
        this.formControl = this.formBuilder.array([]);
        this.tokenValueTable = this.formBuilder.group({
            categoryRows: this.formControl
        });
    }

    ngOnInit(): void {
        const tokenValuesObservable = this.tokenValueService.getTokenValues();
        const categoryObservable = this.categoryService.getCategories();
        forkJoin([tokenValuesObservable, categoryObservable]).subscribe(result => {
            this.existingTokenValues = result[0];
            this.topLevelCategoryList = result[1].filter(c => c.parent == null);
            this.categoryList = result[1];
        });
    }


    get getFormControls() {
        try {
            return this.tokenValueTable.get('categoryRows') as FormArray;
        } catch (e) {
            console.log(e);
            return this.formBuilder.array([]);
        }
    }

    private getValueByDifficulty(difficulty: string, categoryId: number): number {
        try {
            const tokenVal = this.existingTokenValues.find(
                element => (element.difficulty === difficulty) && (element.category === categoryId)
            );
            return tokenVal.value;
        } catch (e) {
            return NaN;
        }
    }

    private getIDByDifficulty(difficulty: string, categoryId: number): string {
        try {
            const tokenVal = this.existingTokenValues.find(
                element => (element.difficulty === difficulty) && (element.category === categoryId)
            );
            return tokenVal.pk.toString();
        } catch (e) {
            return 'N/A';
        }
    }

    refresh(): void {
        window.location.reload();
    }

    submitForm() {
        const formControl = this.getFormControls;
        this.editedRows = formControl.controls.filter(row => row.touched).map(row => row.value);
        this.updateNewTokenValues(this.editedRows);
    }

    private updateNewTokenValues(editedRows): void {
        editedRows.forEach(row => {
            // TODO: Find a way to do this so it doesn't matter how many difficulties there are aka dynamic
            const rowValues = [row.Easy, row.Medium, row.Hard];
            const tokenIds = row.Token_Id.split(' ');
            for (let i = 0; i < tokenIds.length; i++) {
                const currentTokenValue = this.existingTokenValues.find(element => element.pk === +tokenIds[i]);
                if (currentTokenValue.value !== rowValues[i]) {
                    currentTokenValue.value = rowValues[i];
                    this.tokenValueService.updateTokenValue(currentTokenValue).subscribe();
                }
            }
        });
        this.refresh();
    }

    isSubCategory(subCat, mainCat): boolean {
        return this.subCategories[mainCat].find(c => c.pk === subCat);
    }

    toggleChildTopics(category: Category): void {
        this.expanded[category.name] = !this.expanded[category.name];
        this.subCategories[category.name] = this.categoryList.filter(c => c.parent === category.pk);
        this.subCategories[category.name].forEach(cat => {
            this.getFormControls.push(this.formBuilder.group({
                Category_Name: new FormControl({value: cat.name, disabled: true}),
                Easy: this.getValueByDifficulty('EASY', cat.pk),
                Medium: this.getValueByDifficulty('NORMAL', cat.pk),
                Hard: this.getValueByDifficulty('HARD', cat.pk),
                Token_Id: this.getIDByDifficulty('EASY', cat.pk) + ' ' + this.getIDByDifficulty('NORMAL', cat.pk)
                    + ' ' + this.getIDByDifficulty('HARD', cat.pk),
                categoryPk: cat.pk
            }));
        });
    }

}
