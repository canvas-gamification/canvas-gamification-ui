import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSubmissionComponent } from './problem-submission.component';

describe('ProblemSubmissionComponent', () => {
  let component: ProblemSubmissionComponent;
  let fixture: ComponentFixture<ProblemSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
