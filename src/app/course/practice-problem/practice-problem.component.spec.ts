import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestModule} from '@test/test.module';
import {UqjService} from '@app/problems/_services/uqj.service';
import {ActivatedRoute, convertToParamMap, RouterModule} from '@angular/router';
import {CategoryService} from '@app/_services/api/category.service';
import {CategoryServiceMock} from '@test/category.service.mock';
import {CourseService} from '@app/course/_services/course.service';
import {CourseServiceMock} from '@test/course.service.mock';
import {DifficultyService} from '@app/problems/_services/difficulty.service';
import {DifficultyServiceMock} from '@app/problems/_test/_services/difficulty.service.mock';
import {
    MOCK_CATEGORIES,
    MOCK_DIFFICULTIES,
    MOCK_UQJ_5,
    MOCK_UQJ_6,
    MOCK_UQJ_7,
    MOCK_UQJ_8
} from '@app/problems/_test/mock';
import {UserStatsService} from '@app/_services/api/user-stats.service';
import {UserStatsServiceMock} from '@test/user-stats.service.mock';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {PracticeProblemComponent} from '@app/course/practice-problem/practice-problem.component';
import {TuiCheckboxLabeledModule, TuiMarkerIconModule, TuiSelectModule, TuiTagModule} from '@taiga-ui/kit';
import {TuiTableModule} from '@taiga-ui/addon-table';
import {ProblemViewComponent} from '@app/problems/problem-view/problem-view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StringifyTuiDataListPipe} from '@app/_helpers/pipes/stringify-tui-data-list.pipe';
import {of} from 'rxjs';


describe('PracticeProblemComponent', () => {
    let component: PracticeProblemComponent;
    let fixture: ComponentFixture<PracticeProblemComponent>;
    let mockUqjService: UqjService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PracticeProblemComponent, ProblemViewComponent, StringifyTuiDataListPipe],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: DifficultyService, useClass: DifficultyServiceMock},
                {provide: UserStatsService, useClass: UserStatsServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        paramMap: of(convertToParamMap({
                            categoryId: 0,
                            courseId: 0
                        })),
                        snapshot: convertToParamMap({
                            categoryId: 0,
                            courseId: 0
                        })
                    }
                }
            ],
            imports: [
                TestModule,
                FormsModule,
                ReactiveFormsModule,
                RouterModule,
                TuiSelectModule,
                TuiButtonModule,
                TuiDataListModule,
                TuiTagModule,
                TuiTableModule,
                TuiHostedDropdownModule,
                TuiTextfieldControllerModule,
                TuiCheckboxLabeledModule,
                TuiMarkerIconModule
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        mockUqjService = TestBed.inject(UqjService);
        spyOn(mockUqjService, 'getUQJs').and.returnValue(
            of({
                count: 4,
                next: null,
                previous: null,
                results: [MOCK_UQJ_5, MOCK_UQJ_6, MOCK_UQJ_7, MOCK_UQJ_8]
            }));
        fixture = TestBed.createComponent(PracticeProblemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set courseId and categoryId', () => {
        expect(component.courseId).toEqual(0);
        expect(component.categoryId).toEqual(0);
    });

    it('should get all values from the API', () => {
        expect(component.uqjs.length).toEqual(4);
        expect(component.difficulties).toEqual(MOCK_DIFFICULTIES);
        expect(component.category).toEqual(MOCK_CATEGORIES.find(category => category.pk === 0));
        expect(component.userSuccessRate).toEqual(1);
    });

    it('should not skip question when there is only one uqj', () => {
        component.uqjs = [MOCK_UQJ_5];
        component.nextQuestion();
        fixture.detectChanges();
        expect(component.currentQuestionId).toEqual(MOCK_UQJ_5.id);
    });

    it('should skip question when there are multiple uqjs', () => {
        const firstUqj = component.currentQuestionId;
        component.nextQuestion();
        fixture.detectChanges();
        expect(component.currentQuestionId === firstUqj).toBeFalsy();
    });

    it('should not change question when clicking previous question with one uqj', () => {
        component.uqjs = [MOCK_UQJ_5];
        component.prevQuestion();
        fixture.detectChanges();
        expect(component.currentQuestionId).toEqual(MOCK_UQJ_5.id);
    });

    it('should go to previous question when there are multiple uqjs', () => {
        const previousQuestionId = component.currentQuestionId;
        component.nextQuestion();
        fixture.detectChanges();
        component.prevQuestion();
        fixture.detectChanges();
        expect(component.currentQuestionId).toEqual(previousQuestionId);
    });

    it('should apply filter - uqjs in filtered list', () => {
        component.updateQuestions(null, null);
        fixture.detectChanges();
        expect(component.difficulty).toEqual(null);
    });
});
