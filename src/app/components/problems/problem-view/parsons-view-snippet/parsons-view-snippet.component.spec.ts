import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsonsViewSnippetComponent } from './parsons-view-snippet.component';

describe('ParsonsViewSnippetComponent', () => {
  let component: ParsonsViewSnippetComponent;
  let fixture: ComponentFixture<ParsonsViewSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParsonsViewSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParsonsViewSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
