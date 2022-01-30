import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestModule} from "@test/test.module";
import {UqjService} from "@app/problems/_services/uqj.service";
import {UqjServiceMock} from "@app/problems/_test/_services/uqj.service.mock";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {CourseService} from "@app/course/_services/course.service";
import {CourseServiceMock} from "@test/course.service.mock";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {DifficultyServiceMock} from "@app/problems/_test/_services/difficulty.service.mock";
import {
    MOCK_CATEGORIES,
    MOCK_DIFFICULTIES,
    MOCK_UQJ_5,
    MOCK_UQJ_6, MOCK_UQJ_7, MOCK_UQJ_8
} from "@app/problems/_test/mock";
import {UserStatsService} from "@app/_services/api/user-stats.service";
import {UserStatsServiceMock} from "@test/user-stats.service.mock";
import {TuiNotificationsService} from "@taiga-ui/core";
import {of} from "rxjs";
import {ReactiveFormsModule} from "@angular/forms";
import {PracticeProblemComponent} from "@app/course/practice-problem/practice-problem.component";


describe('PracticeProblemComponent', () => {
    let component: PracticeProblemComponent;
    let fixture: ComponentFixture<PracticeProblemComponent>;
    let notificationService: TuiNotificationsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PracticeProblemComponent],
            providers: [
                {provide: UqjService, useClass: UqjServiceMock},
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: DifficultyService, useClass: DifficultyServiceMock},
                {provide: UserStatsService, useClass: UserStatsServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({
                                categoryId: 0,
                                courseId: 0
                            })
                        }
                    }
                }
            ],
            imports: [TestModule, ReactiveFormsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        notificationService = TestBed.inject(TuiNotificationsService);
        spyOn(notificationService, 'show').and.callFake(() => {
            return of();
        });
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
        expect(component.uqjs).toEqual([MOCK_UQJ_5, MOCK_UQJ_6, MOCK_UQJ_7, MOCK_UQJ_8]);
        expect(component.difficulties).toEqual(MOCK_DIFFICULTIES);
        expect(component.category).toEqual(MOCK_CATEGORIES.find(category => category.pk === 0));
        expect(component.userSuccessRate).toEqual(1);
    });

    it('should not skip question when there is only one uqj', () => {
        component.uqjs = [MOCK_UQJ_5];
        component.nextQuestion();
        fixture.detectChanges();
        expect(component.currentQuestionId).toEqual(MOCK_UQJ_5.id);
        expect(notificationService.show).toHaveBeenCalled();
    });

    it('should skip question when there are multiple uqjs', () => {
        const firstUqj = component.currentQuestionId;
        component.nextQuestion();
        fixture.detectChanges();
        expect(component.currentQuestionId).toEqual(!firstUqj);
    });

    it('should not change question when clicking previous question with one uqj', () => {
        component.uqjs = [MOCK_UQJ_5];
        component.prevQuestion();
        fixture.detectChanges();
        expect(component.currentQuestionId).toEqual(MOCK_UQJ_5.id);
        expect(notificationService.show).toHaveBeenCalled();
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
        component.difficultyFormData.controls['difficulty'].setValue('');
        component.applyFilter();
        fixture.detectChanges();
        expect(component.currentUqj).toBeTruthy();
    });

    it('should apply filter - no uqjs in filtered list', () => {
        component.difficultyFormData.controls['difficulty'].setValue('TEST');
        component.applyFilter();
        fixture.detectChanges();
        expect(component.currentUqj).toBeUndefined();
    });
});
