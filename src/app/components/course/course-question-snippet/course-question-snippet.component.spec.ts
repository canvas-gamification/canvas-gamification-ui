import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseQuestionSnippetComponent } from './course-question-snippet.component';

describe('CourseQuestionSnippetComponent', () => {
  let component: CourseQuestionSnippetComponent;
  let fixture: ComponentFixture<CourseQuestionSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseQuestionSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseQuestionSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
