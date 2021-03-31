import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableViewComponent } from './variable-view.component';

describe('VariableViewComponent', () => {
  let component: VariableViewComponent;
  let fixture: ComponentFixture<VariableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
