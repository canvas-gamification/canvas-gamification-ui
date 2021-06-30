import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProblemSetComponent} from '../../problem-set/problem-set.component';
import {TestModule} from '@test/test.module';
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {DifficultyServiceMock} from "@app/problems/_test/difficulty.service.mock";
import {ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_test/question.service.mock";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AppRoutingModule} from "@app/app-routing.module";

describe('ProblemSetComponent', () => {
    let component: ProblemSetComponent;
    let fixture: ComponentFixture<ProblemSetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, ReactiveFormsModule, MatPaginatorModule, MatTableModule, FontAwesomeModule, AppRoutingModule],
            declarations: [ProblemSetComponent],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: DifficultyService, useClass: DifficultyServiceMock},
                {provide: QuestionService, useClass: QuestionServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProblemSetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('change parent category', () => {
        const select: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#category');
        select.value = select.options[1].value;
        select.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        expect(component.subCategories.length).toEqual(1);
    });

    it('testing sort method', () => {
        component.sortData({active: 'ascending', direction: 'asc'});
        expect(component.ordering).toEqual('ascending');

        component.sortData({active: 'ascending', direction: 'desc'});
        expect(component.ordering).toEqual('-ascending');

        component.sortData({active: 'ascending', direction: ''});
        expect(component.ordering).toEqual('');
    });

    it('applyFilter', () => {
        component.formGroup.controls['difficulty'].setValue('');
        component.formGroup.controls['is_sample'].setValue('');
        component.formGroup.controls['parentCategory'].setValue('');
        component.formGroup.controls['search'].setValue('');
        component.formGroup.controls['subCategory'].setValue('');
        component.applyFilter();
        fixture.detectChanges();
        expect(component.filterQueryString === component.formGroup.value);
    });

    it('delete a question', () => {
        component.deleteQuestionId = 0;
        component.deleteQuestion();
        // TODO - Determine that this has occurred.
    });

    it('open delete modal', () => {
        component.open('', 0);
        expect(component.deleteQuestionId).toEqual(0);
    });
});
