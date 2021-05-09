import {TestBed} from '@angular/core/testing';

import {UserActionsService} from './user-actions.service';
import {TestModule} from '@test/test.module';

describe('UserActionsService', () => {
    let service: UserActionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(UserActionsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
