import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStudentNumberComponent } from './register-student-number.component';

describe('RegisterStudentNumberComponent', () => {
  let component: RegisterStudentNumberComponent;
  let fixture: ComponentFixture<RegisterStudentNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterStudentNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStudentNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
