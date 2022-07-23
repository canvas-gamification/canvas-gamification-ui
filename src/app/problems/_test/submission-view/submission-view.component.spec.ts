import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SubmissionViewComponent} from '../../submission-view/submission-view.component'
import {TestModule} from '@test/test.module'
import {DatePipe} from "@angular/common"
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {MOCK_QUESTION_SUBMISSION} from '@app/problems/_test/mock'

describe('SubmissionViewComponent', () => {
    let component: SubmissionViewComponent
    let fixture: ComponentFixture<SubmissionViewComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SubmissionViewComponent, DatePipe],
            imports: [TestModule],
            providers: [
                {
                    provide: POLYMORPHEUS_CONTEXT, useValue: {
                        data: MOCK_QUESTION_SUBMISSION
                    }
                }
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SubmissionViewComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
