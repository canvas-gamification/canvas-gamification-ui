import {TestBed} from '@angular/core/testing'

import {ProfileDetailsService} from './profile-details.service'
import {TestModule} from '@test/test.module'

describe('ProfileDetailsService', () => {
    let service: ProfileDetailsService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        })
        service = TestBed.inject(ProfileDetailsService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
