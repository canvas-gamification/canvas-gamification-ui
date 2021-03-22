import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqViewSnippetComponent } from './mcq-view-snippet.component';

describe('McqViewSnippetComponent', () => {
  let component: McqViewSnippetComponent;
  let fixture: ComponentFixture<McqViewSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McqViewSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McqViewSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
