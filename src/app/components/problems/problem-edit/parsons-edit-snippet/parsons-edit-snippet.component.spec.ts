import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsonsEditSnippetComponent } from './parsons-edit-snippet.component';

describe('ParsonsEditSnippetComponent', () => {
  let component: ParsonsEditSnippetComponent;
  let fixture: ComponentFixture<ParsonsEditSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParsonsEditSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParsonsEditSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
