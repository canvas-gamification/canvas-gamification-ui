import {TestBed} from '@angular/core/testing'

import {PageViewService} from './page-view.service'

describe('PageViewService', () => {
    let service: PageViewService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(PageViewService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
