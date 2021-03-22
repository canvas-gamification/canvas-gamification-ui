import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaViewSnippetComponent } from './java-view-snippet.component';

describe('JavaViewSnippetComponent', () => {
  let component: JavaViewSnippetComponent;
  let fixture: ComponentFixture<JavaViewSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaViewSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaViewSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
