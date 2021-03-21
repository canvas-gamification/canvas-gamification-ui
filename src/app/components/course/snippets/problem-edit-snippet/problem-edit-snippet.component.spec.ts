import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemEditSnippetComponent } from './problem-edit-snippet.component';

describe('ProblemEditSnippetComponent', () => {
  let component: ProblemEditSnippetComponent;
  let fixture: ComponentFixture<ProblemEditSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemEditSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemEditSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
