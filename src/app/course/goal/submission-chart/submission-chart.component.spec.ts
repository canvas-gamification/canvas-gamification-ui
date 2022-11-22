import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SubmissionChartComponent} from './submission-chart.component'

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
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
