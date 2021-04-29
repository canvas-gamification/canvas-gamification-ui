import { TestBed } from '@angular/core/testing';

import { CategoryStatsService } from './category-stats.service';

describe('CategoryStatsService', () => {
  let service: CategoryStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
