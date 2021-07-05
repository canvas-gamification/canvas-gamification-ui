import {TestBed} from '@angular/core/testing';

import {TokenUseService} from './token-use.service';
import {TestModule} from '@test/test.module';

describe('TokenUseService', () => {
    let service: TokenUseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(TokenUseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
