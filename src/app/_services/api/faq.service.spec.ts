import {TestBed} from '@angular/core/testing';

import {FaqService} from './faq.service';
import {TestModule} from '@test/test.module';

describe('FaqService', () => {
    let service: FaqService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(FaqService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
