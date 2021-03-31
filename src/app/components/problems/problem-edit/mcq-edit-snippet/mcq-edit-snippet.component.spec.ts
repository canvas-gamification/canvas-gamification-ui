import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqEditSnippetComponent } from './mcq-edit-snippet.component';

describe('McqEditSnippetComponent', () => {
  let component: McqEditSnippetComponent;
  let fixture: ComponentFixture<McqEditSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McqEditSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McqEditSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
