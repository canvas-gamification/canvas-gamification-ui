import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEventCreateComponent } from './course-event-create.component';

describe('CourseEventCreateComponent', () => {
  let component: CourseEventCreateComponent;
  let fixture: ComponentFixture<CourseEventCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEventCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
