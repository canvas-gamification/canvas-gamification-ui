import {Component, OnInit} from '@angular/core';
import {TokenValuesService} from '@app/_services/api/token-values.service';
import {CategoryService} from '@app/_services/api/category.service';
import {NestedTokenValue} from '@app/_models';
import {faCaretDown, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {Difficulty} from '@app/_models/difficulty';
import {DifficultyService} from '@app/problems/_services/difficulty.service';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-token-values',
    templateUrl: './token-values.component.html',
    styleUrls: ['./token-values.component.scss']
})
export class TokenValuesComponent implements OnInit {
    expanded: {
        [index: string]: boolean;
    } = {};
    faCaretRight = faCaretRight;
    faCaretDown = faCaretDown;

    tokenValues: NestedTokenValue[];
    difficulties: Difficulty[];

    constructor(
        private tokenValueService: TokenValuesService,
        private categoryService: CategoryService,
        private difficultyService: DifficultyService,
        private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.tokenValueService.getNestedTokenValues().subscribe(tokenValues => this.tokenValues = tokenValues);
        this.difficultyService.getDifficulties().subscribe(difficulties => this.difficulties = difficulties);
    }

    submit(): void {
        const data: { id: number, value: number }[] = [];
        for (const nestedTokenValue of this.tokenValues) {
            for (const childNestedTokenValue of nestedTokenValue.children) {
                for (const tokenValue of childNestedTokenValue.token_values) {
                    data.push({
                        id: tokenValue.pk,
                        value: tokenValue.value
                    });
                }
            }
        }

        this.tokenValueService.updateBulk(data).subscribe(() => {
            this.toastr.success('Token values updated successfully');
            window.scroll(0, 0);
        });
    }

    toggleExpand(categoryName: string): void {
        this.expanded[categoryName] = !this.expanded[categoryName];
    }
}
