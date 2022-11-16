import {ComponentFixture, TestBed} from '@angular/core/testing'

import {GoalCreationPageComponent} from './goal-creation-page.component'
import {TestModule} from "@test/test.module"
import {CategoryService} from "@app/_services/api/category.service"
import {CategoryServiceMock} from "@test/category.service.mock"

fdescribe('GoalCreationPageComponent', () => {
    let component: GoalCreationPageComponent
    let fixture: ComponentFixture<GoalCreationPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [ GoalCreationPageComponent ],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock}
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

    it('Make sure end date is initially set to equal current day', () => {
        const today = new Date().getTime()

        expect(component.goalForm.get('end_date').value.toLocalNativeDate().getTime()).toBeGreaterThanOrEqual(today)
    })
})
