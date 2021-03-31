import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsonsCreateSnippetComponent } from './parsons-create-snippet.component';

describe('ParsonsCreateSnippetComponent', () => {
  let component: ParsonsCreateSnippetComponent;
  let fixture: ComponentFixture<ParsonsCreateSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParsonsCreateSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParsonsCreateSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
