import {TestBed} from '@angular/core/testing';

import {ProblemHelpersService} from './problem-helpers.service';
import {TestModule} from '@test/test.module';

describe('ProblemHelpersService', () => {
    let service: ProblemHelpersService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(ProblemHelpersService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
