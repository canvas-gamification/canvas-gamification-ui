import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProblemSetComponent} from '../../problem-set/problem-set.component';
import {TestModule} from '@test/test.module';
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {DifficultyServiceMock} from "@app/problems/_test/_services/difficulty.service.mock";
import {ReactiveFormsModule} from "@angular/forms";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_test/_services/question.service.mock";
import {AppRoutingModule} from "@app/app-routing.module";
import {
    TuiDataListModule,
    TuiHintModule,
    TuiHostedDropdownModule,
    TuiLoaderModule,
    TuiNotificationsService
} from "@taiga-ui/core";
import {of} from "rxjs";
import {TuiTableModule, TuiTablePaginationModule} from "@taiga-ui/addon-table";
import {TuiInputModule, TuiSelectModule, TuiTagModule} from "@taiga-ui/kit";

describe('ProblemSetComponent', () => {
    let component: ProblemSetComponent;
    let fixture: ComponentFixture<ProblemSetComponent>;
    let notificationService: TuiNotificationsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, ReactiveFormsModule, AppRoutingModule, TuiHostedDropdownModule, TuiLoaderModule,
                TuiTableModule, TuiTablePaginationModule, TuiSelectModule, TuiDataListModule, TuiInputModule,
                TuiHintModule, TuiTagModule],
            declarations: [ProblemSetComponent],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: DifficultyService, useClass: DifficultyServiceMock},
                {provide: QuestionService, useClass: QuestionServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        notificationService = TestBed.inject(TuiNotificationsService);
        spyOn(notificationService, 'show').and.callFake(() => {
            return of();
        });
        fixture = TestBed.createComponent(ProblemSetComponent);
        component = fixture.componentInstance;
        spyOn(component.paramChanged, 'next').and.callThrough();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change parent category', () => {
        expect(component.subCategories).toEqual(undefined);
        component.form.parentCategory.setValue(component.parentCategories[0].name);
        expect(component.subCategories.length).toEqual(1);
    });

    it('should update', () => {
        component.update();
        expect(component.filteringQuestions).toBeTrue();
        expect(component.paramChanged.next).toHaveBeenCalled();
    });

    it('should get options', () => {
        const options = component.getOptions();
        expect(options).toEqual({
            ...component.getFilterQueryString(),
            page: component.page + 1,
            page_size: component.pageSize,
            ordering: component.getOrdering()
        });
    });

    it('should get order', () => {
        component.sorter = component.sorters['id'];
        component.sortDirection = 1;
        expect(component.getOrdering()).toEqual('id');
        component.sorter = component.sorters['title'];
        component.sortDirection = -1;
        expect(component.getOrdering()).toEqual('-title');
        component.sorter = component.sorters['author_name'];
        component.sortDirection = 1;
        expect(component.getOrdering()).toEqual('author');
    });

    it('should get filter', () => {
        component.formGroup.controls['search'].setValue('');
        component.formGroup.controls['difficulty'].setValue('EASY');
        component.formGroup.controls['is_sample'].setValue('true');
        component.formGroup.controls['parentCategory'].setValue('');
        component.formGroup.controls['subCategory'].setValue('');
        fixture.detectChanges();
        expect(component.getFilterQueryString()).toEqual(component.formGroup.value);
    });

    it('should delete a question', () => {
        component.deleteQuestion(0);
        expect(notificationService.show).toHaveBeenCalled();
    });

    it('should open delete modal', () => {
        spyOn(component['dialogService'], 'open').and.callFake(() => of());
        component.openDeleteQuestionDialog('', 0);
        expect(component['dialogService'].open).toHaveBeenCalled();
    });
});
