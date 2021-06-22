import {TestBed} from '@angular/core/testing';

import {SubmissionService} from './submission.service';
import {TestModule} from '@test/test.module';

describe('SubmissionService', () => {
    let service: SubmissionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [SubmissionService]
        });
        service = TestBed.inject(SubmissionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
