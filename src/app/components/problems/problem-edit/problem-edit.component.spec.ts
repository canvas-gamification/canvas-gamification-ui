import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemEditComponent } from './problem-edit.component';

describe('ProblemEditComponent', () => {
  let component: ProblemEditComponent;
  let fixture: ComponentFixture<ProblemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
