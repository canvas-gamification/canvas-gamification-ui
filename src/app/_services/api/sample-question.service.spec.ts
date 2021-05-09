import {TestBed} from '@angular/core/testing';

import {SampleQuestionService} from './sample-question.service';
import {TestModule} from '@test/test.module';

describe('QuestionService', () => {
    let service: SampleQuestionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(SampleQuestionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
