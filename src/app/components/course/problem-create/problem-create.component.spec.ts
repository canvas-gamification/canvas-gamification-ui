import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemCreateComponent } from './problem-create.component';

describe('ProblemCreateComponent', () => {
  let component: ProblemCreateComponent;
  let fixture: ComponentFixture<ProblemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
