import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemViewComponent } from './problem-view.component';

describe('ProblemViewComponent', () => {
  let component: ProblemViewComponent;
  let fixture: ComponentFixture<ProblemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
