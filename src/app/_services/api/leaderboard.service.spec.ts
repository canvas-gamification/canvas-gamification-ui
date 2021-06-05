import { TestBed } from '@angular/core/testing';

import { LeaderboardService } from './leaderboard.service';
import {TestModule} from '@test/test.module';

describe('LeaderboardService', () => {
  let service: LeaderboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    });
    service = TestBed.inject(LeaderboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
