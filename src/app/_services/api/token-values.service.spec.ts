import {TestBed} from '@angular/core/testing';

import {TokenValuesService} from './token-values.service';
import {TestModule} from '@test/test.module';

describe('TokenValuesService', () => {
    let service: TokenValuesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(TokenValuesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
