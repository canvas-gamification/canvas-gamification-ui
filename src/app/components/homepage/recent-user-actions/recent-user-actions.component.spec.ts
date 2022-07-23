import {ComponentFixture, TestBed} from '@angular/core/testing'

import {RecentUserActionsComponent} from './recent-user-actions.component'
import {TestModule} from '../../../../test/test.module'

describe('RecentUserActionsComponent', () => {
    let component: RecentUserActionsComponent
    let fixture: ComponentFixture<RecentUserActionsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(RecentUserActionsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
