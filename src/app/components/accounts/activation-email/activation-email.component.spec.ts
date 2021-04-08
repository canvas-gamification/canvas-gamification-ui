import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationEmailComponent } from './activation-email.component';

describe('ActivationEmailComponent', () => {
  let component: ActivationEmailComponent;
  let fixture: ComponentFixture<ActivationEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
