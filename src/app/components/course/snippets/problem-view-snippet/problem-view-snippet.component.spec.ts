import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemViewSnippetComponent } from './problem-view-snippet.component';

describe('ProblemViewSnippetComponent', () => {
  let component: ProblemViewSnippetComponent;
  let fixture: ComponentFixture<ProblemViewSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemViewSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemViewSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
