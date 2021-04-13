import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionSnippetComponent } from './submission-snippet.component';

describe('SubmissionSnippetComponent', () => {
  let component: SubmissionSnippetComponent;
  let fixture: ComponentFixture<SubmissionSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
