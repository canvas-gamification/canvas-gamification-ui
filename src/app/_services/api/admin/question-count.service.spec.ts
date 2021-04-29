import { TestBed } from '@angular/core/testing';

import { QuestionCountService } from './question-count.service';

describe('QuestionCountService', () => {
  let service: QuestionCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
