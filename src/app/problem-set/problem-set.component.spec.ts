import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSetComponent } from './problem-set.component';

describe('ProblemSetComponent', () => {
  let component: ProblemSetComponent;
  let fixture: ComponentFixture<ProblemSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
