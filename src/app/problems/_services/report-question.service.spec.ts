import {TestBed} from '@angular/core/testing'

import {ReportQuestionService} from './report-question.service'

describe('ReportQuestionService', () => {
    let service: ReportQuestionService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(ReportQuestionService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
