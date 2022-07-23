import {TestBed} from '@angular/core/testing'

import {ApiService} from './api.service'
import {TestModule} from "@test/test.module"

describe('BaseService', () => {
    let service: ApiService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        })
        service = TestBed.inject(ApiService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
