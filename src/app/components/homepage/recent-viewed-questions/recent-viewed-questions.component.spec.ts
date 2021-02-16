import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentViewedQuestionsComponent } from './recent-viewed-questions.component';

describe('RecentViewedQuestionsComponent', () => {
  let component: RecentViewedQuestionsComponent;
  let fixture: ComponentFixture<RecentViewedQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentViewedQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentViewedQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
