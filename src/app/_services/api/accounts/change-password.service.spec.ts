import {TestBed} from '@angular/core/testing';

import {ChangePasswordService} from "@app/_services/api/accounts/change-password.service";
import {TestModule} from '@test/test.module';

describe('ChangePasswordService', () => {
    let service: ChangePasswordService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(ChangePasswordService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

