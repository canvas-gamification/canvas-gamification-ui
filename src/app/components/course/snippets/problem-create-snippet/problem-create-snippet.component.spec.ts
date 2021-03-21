import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemCreateSnippetComponent } from './problem-create-snippet.component';

describe('ProblemCreateSnippetComponent', () => {
  let component: ProblemCreateSnippetComponent;
  let fixture: ComponentFixture<ProblemCreateSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemCreateSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemCreateSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
