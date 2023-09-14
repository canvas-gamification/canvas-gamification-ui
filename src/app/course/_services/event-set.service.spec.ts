import {TestBed} from '@angular/core/testing'

import {EventSetService} from './event-set.service'

describe('EventSetService', () => {
    let service: EventSetService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(EventSetService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
