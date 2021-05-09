import {TestBed} from '@angular/core/testing';

import {UserStatsService} from './user-stats.service';
import {TestModule} from '@test/test.module';

describe('UserStatsService', () => {
    let service: UserStatsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(UserStatsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
