import {ComponentFixture, TestBed} from '@angular/core/testing'
import {GoalCreationPageComponent} from "@app/course/goal-creation-page/goal-creation-page.component"
import {MOCK_GOALS, MOCK_CATEGORIES, MOCK_DIFFICULTIES, MOCK_FORM} from "@app/problems/_test/mock"
import {CategoryService} from "@app/_services/api/category.service"
import {CategoryServiceMock} from "@test/category.service.mock"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {DifficultyServiceMock} from "@app/problems/_test/_services/difficulty.service.mock"
import {GoalService} from "@app/course/_services/goal.service"
import {GoalServiceMock} from "@test/goal.service.mock"


describe('GoalCreationPage', () => {
    let component: GoalCreationPageComponent
    let fixture: ComponentFixture<GoalCreationPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ GoalCreationPageComponent ],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: GoalService, useClass: GoalServiceMock},
                {provide: DifficultyService, useClass: DifficultyServiceMock},
            ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(GoalCreationPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should retrieve suggested goals', () => {
        expect(component.suggestedGoals).toEqual(MOCK_GOALS)
    })

    it('should retrieve categories', () => {
        expect(component.categories).toEqual(MOCK_CATEGORIES)
    })

    it('should retrieve difficulties', () => {
        expect(component.difficulties).toEqual(MOCK_DIFFICULTIES)
    })

    it('should test that form is being created properly', () => {
        expect(component.goalForm).toEqual(MOCK_FORM)
    })


})
