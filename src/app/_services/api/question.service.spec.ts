import {TestBed} from '@angular/core/testing';

import {QuestionService} from './question.service';
import {TestModule} from '@test/test.module';

describe('QuestionService', () => {
    let service: QuestionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(QuestionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
