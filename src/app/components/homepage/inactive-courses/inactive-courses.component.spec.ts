import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveCoursesComponent } from './inactive-courses.component';

describe('InactiveCoursesComponent', () => {
  let component: InactiveCoursesComponent;
  let fixture: ComponentFixture<InactiveCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
