import {TestBed} from '@angular/core/testing';

import {DifficultyService} from './difficulty.service';
import {TestModule} from '@test/test.module';

describe('DifficultyService', () => {
    let service: DifficultyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(DifficultyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
