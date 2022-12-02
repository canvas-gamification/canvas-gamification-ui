import {ComponentFixture, TestBed} from '@angular/core/testing'
import {MOCK_CATEGORIES, MOCK_DIFFICULTIES} from "@app/problems/_test/mock"
import {CategoryService} from "@app/_services/api/category.service"
import {CategoryServiceMock} from "@test/category.service.mock"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {DifficultyServiceMock} from "@app/problems/_test/_services/difficulty.service.mock"
import {GoalService} from "@app/course/_services/goal.service"
import {GoalServiceMock} from "@app/course/_test/_services/goal.service.mock"
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
import {StringifyTuiDataListPipe} from "@app/_helpers/pipes/stringify-tui-data-list.pipe"
import {GoalCreateComponent} from "@app/course/goal/goal-create/goal-create.component"

describe('GoalCreateComponent', () => {
    let component: GoalCreateComponent
    let fixture: ComponentFixture<GoalCreateComponent>

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
            declarations: [GoalCreateComponent, StringifyTuiDataListPipe],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: GoalService, useClass: GoalServiceMock},
                {provide: DifficultyService, useClass: DifficultyServiceMock},
            ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(GoalCreateComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should retrieve categories', () => {
        expect(component.categories).toEqual(MOCK_CATEGORIES)
    })

    it('should retrieve difficulties', () => {
        expect(component.difficulties).toEqual(MOCK_DIFFICULTIES)
    })
})
