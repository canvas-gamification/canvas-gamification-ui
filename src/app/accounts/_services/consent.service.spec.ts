import {TestBed} from '@angular/core/testing';

import {ConsentService} from './consent.service';
import {TestModule} from '@test/test.module';

describe('ConsentService', () => {
    let service: ConsentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(ConsentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
