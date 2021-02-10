import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameConfirmComponent } from './name-confirm.component';

describe('NameConfirmComponent', () => {
  let component: NameConfirmComponent;
  let fixture: ComponentFixture<NameConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
