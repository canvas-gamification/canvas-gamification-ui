import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemDeleteComponent } from './problem-delete.component';

describe('ProblemDeleteComponent', () => {
  let component: ProblemDeleteComponent;
  let fixture: ComponentFixture<ProblemDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
