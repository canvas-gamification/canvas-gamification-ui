import {ComponentFixture, TestBed} from '@angular/core/testing'

import {RecentViewedQuestionsComponent} from './recent-viewed-questions.component'
import {TestModule} from '../../../../test/test.module'

describe('RecentViewedQuestionsComponent', () => {
    let component: RecentViewedQuestionsComponent
    let fixture: ComponentFixture<RecentViewedQuestionsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(RecentViewedQuestionsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
