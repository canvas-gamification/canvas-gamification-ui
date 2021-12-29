import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProblemPracticeComponent} from "@app/problems/problem-practice/problem-practice.component";
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


describe('ProblemPracticeComponent', () => {
    let component: ProblemPracticeComponent;
    let fixture: ComponentFixture<ProblemPracticeComponent>;
    let notificationService: TuiNotificationsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProblemPracticeComponent],
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
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        notificationService = TestBed.inject(TuiNotificationsService);
        spyOn(notificationService, 'show').and.callFake(() => {
            return of();
        });
        fixture = TestBed.createComponent(ProblemPracticeComponent);
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
        expect(component.filteredUqjs).toEqual([MOCK_UQJ_5, MOCK_UQJ_6, MOCK_UQJ_7, MOCK_UQJ_8]);
    });

    it('should not skip question when there is only one uqj', () => {
        component.filteredUqjs = [MOCK_UQJ_5];
        component.skipQuestion(true);
        fixture.detectChanges();
        expect(component.previousUqj).toEqual(null);
        expect(component.currentUqj).toEqual(MOCK_UQJ_5);
        expect(notificationService.show).toHaveBeenCalled();
    });

    it('should skip question when there are multiple uqjs', () => {
        const firstUqj = component.currentUqj;
        component.skipQuestion(true);
        fixture.detectChanges();
        expect(component.previousUqj).toEqual(firstUqj);
    });

    it('should not change question when clicking previous question with one uqj', () => {
        component.filteredUqjs = [MOCK_UQJ_5];
        component.previousQuestion(true);
        fixture.detectChanges();
        expect(component.previousUqj).toEqual(null);
        expect(component.currentUqj).toEqual(MOCK_UQJ_5);
        expect(notificationService.show).toHaveBeenCalled();
    });

    it('should go to previous question when there are multiple uqjs', () => {
        component.skipQuestion(true);
        fixture.detectChanges();
        const previousUqj = component.previousUqj;
        component.previousQuestion(true);
        fixture.detectChanges();
        expect(component.currentUqj).toEqual(previousUqj);
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