import {ComponentFixture, TestBed} from '@angular/core/testing'

import {GoalCreationPageComponent} from './goal-creation-page.component'

describe('GoalCreationPageComponent', () => {
    let component: GoalCreationPageComponent
    let fixture: ComponentFixture<GoalCreationPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ GoalCreationPageComponent ]
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
})
