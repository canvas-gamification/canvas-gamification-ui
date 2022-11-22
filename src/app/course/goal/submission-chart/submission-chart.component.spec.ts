import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SubmissionChartComponent} from './submission-chart.component'
import {MOCK_GOAL_ITEM_SUBMISSION_STATS} from "@app/course/_test/mock"

describe('SubmissionChartComponent', () => {
    let component: SubmissionChartComponent
    let fixture: ComponentFixture<SubmissionChartComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ SubmissionChartComponent ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SubmissionChartComponent)
        component = fixture.componentInstance
        component.submissionStats = MOCK_GOAL_ITEM_SUBMISSION_STATS
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
