import {TestBed} from '@angular/core/testing';

import {ResetPasswordService} from './reset-password.service';
import {TestModule} from '@test/test.module';

describe('ResetPasswordService', () => {
    let service: ResetPasswordService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(ResetPasswordService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
