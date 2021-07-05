import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsonsLinesComponent } from './parsons-lines.component';

describe('ParsonsLinesComponent', () => {
  let component: ParsonsLinesComponent;
  let fixture: ComponentFixture<ParsonsLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParsonsLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParsonsLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
