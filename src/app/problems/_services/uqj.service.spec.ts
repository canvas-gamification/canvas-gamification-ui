import {TestBed} from '@angular/core/testing';

import {UqjService} from './uqj.service';
import {TestModule} from '@test/test.module';

describe('UqjService', () => {
    let service: UqjService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(UqjService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
