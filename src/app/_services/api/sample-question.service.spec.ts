import { TestBed } from '@angular/core/testing';

import { SampleQuestionService } from './sample-question.service';

describe('QuestionService', () => {
  let service: SampleQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
