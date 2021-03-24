import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaEditSnippetComponent } from './java-edit-snippet.component';

describe('JavaEditSnippetComponent', () => {
  let component: JavaEditSnippetComponent;
  let fixture: ComponentFixture<JavaEditSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaEditSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaEditSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
