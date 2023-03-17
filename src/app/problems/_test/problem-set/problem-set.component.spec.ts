import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing'

import {ProblemSetComponent} from '../../problem-set/problem-set.component'
import {TestModule} from '@test/test.module'
import {CategoryService} from "@app/_services/api/category.service"
import {CategoryServiceMock} from "@test/_services/category.service.mock"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {DifficultyServiceMock} from "@app/problems/_test/_services/difficulty.service.mock"
import {ReactiveFormsModule} from "@angular/forms"
import {QuestionService} from "@app/problems/_services/question.service"
import {QuestionServiceMock} from "@app/problems/_test/_services/question.service.mock"
import {AppRoutingModule} from "@app/app-routing.module"
import {
    TuiDataListModule,
    TuiHintModule,
    TuiHostedDropdownModule,
    TuiLoaderModule,
    TuiNotificationsService
} from "@taiga-ui/core"
import {of} from "rxjs"
import {TuiTableModule, TuiTablePaginationModule} from "@taiga-ui/addon-table"
import {TuiInputModule, TuiSelectModule, TuiTagModule} from "@taiga-ui/kit"
import {StringifyTuiDataListPipe} from "@app/_helpers/pipes/stringify-tui-data-list.pipe"
import {Component, ViewChild} from "@angular/core"
import {MOCK_CATEGORY, MOCK_CATEGORY_2} from "@app/problems/_test/mock"

@Component({
    selector: 'test-app-problem-set-dialog',
    template: `
        <ng-template let-observer #testDialog></ng-template>`
})
class TestProblemSetDialogComponent {
    @ViewChild('testDialog') testDialog

    completeDialog(): void {
        this.testDialog.observer.next()
    }
}

describe('ProblemSetComponent', () => {
    let component: ProblemSetComponent
    let fixture: ComponentFixture<ProblemSetComponent>
    let notificationService: TuiNotificationsService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestModule,
                ReactiveFormsModule,
                AppRoutingModule,
                TuiHostedDropdownModule,
                TuiLoaderModule,
                TuiTableModule,
                TuiTablePaginationModule,
                TuiSelectModule,
                TuiDataListModule,
                TuiInputModule,
                TuiHintModule,
                TuiTagModule
            ],
            declarations: [
                ProblemSetComponent,
                TestProblemSetDialogComponent,
                StringifyTuiDataListPipe
            ],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: DifficultyService, useClass: DifficultyServiceMock},
                {provide: QuestionService, useClass: QuestionServiceMock}
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        notificationService = TestBed.inject(TuiNotificationsService)
        spyOn(notificationService, 'show').and.callFake(() => of())
        fixture = TestBed.createComponent(ProblemSetComponent)
        component = fixture.componentInstance
        spyOn(component.paramChanged, 'next').and.callThrough()
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should change parent category', fakeAsync(() => {
        expect(component.subCategories).toEqual(undefined)
        component.form.parentCategory.setValue(component.parentCategories[0].name)
        expect(component.subCategories.length).toEqual(1)
        tick(1)
    }))

    it('should get options', fakeAsync(() => {
        const options = component.getOptions()
        expect(options).toEqual({
            ...component.getFilterQueryString(),
            page: component.page + 1,
            page_size: component.pageSize,
            ordering: component.getOrdering()
        })
        tick(1)
    }))

    it('should get order', fakeAsync(() => {
        component.sorter = component.sorters['id']
        component.sortDirection = 1
        expect(component.getOrdering()).toEqual('-id')
        component.sorter = component.sorters['title']
        component.sortDirection = -1
        expect(component.getOrdering()).toEqual('title')
        component.sorter = component.sorters['author_name']
        component.sortDirection = 1
        expect(component.getOrdering()).toEqual('-author')
        tick(1)
    }))

    it('should get filter', fakeAsync(() => {
        component.formGroup.controls['search'].setValue('')
        component.formGroup.controls['difficulty'].setValue('EASY')
        component.formGroup.controls['is_sample'].setValue('true')
        component.formGroup.controls['parentCategory'].setValue(MOCK_CATEGORY.name)
        component.formGroup.controls['subCategory'].setValue(MOCK_CATEGORY_2.name)
        fixture.detectChanges()
        tick(1)
        expect(component.getFilterQueryString()).toEqual(component.formGroup.value)
    }))

    it('should delete a question', fakeAsync(() => {
        component.deleteQuestion(0)
        tick(1000)
        expect(notificationService.show).toHaveBeenCalled()
    }))

    it('should open delete modal', fakeAsync(() => {
        spyOn(component['dialogService'], 'open').and.callThrough()
        spyOn(component, 'deleteQuestion').and.callThrough()
        component.openDeleteQuestionDialog('', 0)
        tick(1)
        expect(component['dialogService'].open).toHaveBeenCalled()
    }))
})
