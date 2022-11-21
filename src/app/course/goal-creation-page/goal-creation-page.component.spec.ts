import {ComponentFixture, TestBed} from '@angular/core/testing'
import {GoalCreationPageComponent} from "@app/course/goal-creation-page/goal-creation-page.component"
import {MOCK_GOALS, MOCK_CATEGORIES, MOCK_DIFFICULTIES, MOCK_FORM} from "@app/problems/_test/mock"
import {CategoryService} from "@app/_services/api/category.service"
import {CategoryServiceMock} from "@test/category.service.mock"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {DifficultyServiceMock} from "@app/problems/_test/_services/difficulty.service.mock"
import {GoalService} from "@app/course/_services/goal.service"
import {GoalServiceMock} from "@test/goal.service.mock"
import {ReactiveFormsModule} from "@angular/forms"
import {RouterModule} from "@angular/router"
import {
    TuiCheckboxLabeledModule,
    TuiFieldErrorModule, TuiInputDateModule,
    TuiInputDateRangeModule,
    TuiInputModule, TuiInputNumberModule,
    TuiInputTimeModule,
    TuiSelectModule
} from "@taiga-ui/kit"
import {TuiButtonModule, TuiDataListModule, TuiNotificationModule} from "@taiga-ui/core"
import {StringifyTuiDataListPipe} from "@app/_helpers/pipes/stringify-tui-data-list.pipe";


describe('GoalCreationPage', () => {
    let component: GoalCreationPageComponent
    let fixture: ComponentFixture<GoalCreationPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                RouterModule,
                TuiInputModule,
                TuiSelectModule,
                TuiDataListModule,
                TuiFieldErrorModule,
                TuiCheckboxLabeledModule,
                TuiInputDateRangeModule,
                TuiInputDateModule,
                TuiInputNumberModule,
                TuiInputTimeModule,
                TuiNotificationModule,
                TuiButtonModule
            ],
            declarations: [GoalCreationPageComponent, StringifyTuiDataListPipe],
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

    // This test is wrong you can't compare form groups like this
    // Also you don't need to write tests for form groups
    xit('should test that form is being created properly', () => {
        expect(component.goalForm).toEqual(MOCK_FORM)
    })


})
