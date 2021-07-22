import {Component, OnInit} from '@angular/core';
import {UQJ} from "@app/_models";
import {UqjService} from "@app/problems/_services/uqj.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {Difficulty} from "@app/_models/difficulty";

@Component({
    selector: 'app-problem-practice',
    templateUrl: './problem-practice.component.html',
    styleUrls: ['./problem-practice.component.scss']
})
export class ProblemPracticeComponent implements OnInit {
    formGroup: FormGroup;
    uqjs: UQJ[];
    filteredUqjs: UQJ[];
    currentUqj: UQJ;
    difficulties: Difficulty[];

    constructor(private uqjService: UqjService, private difficultyService: DifficultyService) {
    }

    ngOnInit(): void {
        this.formGroup = new FormBuilder().group({
            difficulty: new FormControl('')
        });
        this.uqjService.getUQJs().subscribe((paginatedUqjs) => {
            this.uqjs = paginatedUqjs.results.filter(uqj => uqj.question.event === null);
            this.filteredUqjs = this.uqjs;
            this.currentUqj = this.filteredUqjs[this.filteredUqjs.length - 1];
        });
        this.difficultyService.getDifficulties().subscribe((difficulties) => this.difficulties = difficulties);
    }

    skipQuestion(): void {
        const skippedUqj = this.filteredUqjs.pop();
        this.filteredUqjs.unshift(skippedUqj);
        this.currentUqj = this.filteredUqjs[this.filteredUqjs.length - 1];
    }

    applyFilter(): void {
        this.formGroup.value.difficulty === '' ? this.filteredUqjs = this.uqjs : this.filteredUqjs = this.uqjs.filter((uqj) => uqj.question.difficulty === this.formGroup.value.difficulty);
        this.currentUqj = this.filteredUqjs[this.filteredUqjs.length - 1];
    }

}
