import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsSnippetComponent } from './terms-and-conditions-snippet.component';

describe('TermsAndConditionsSnippetComponent', () => {
  let component: TermsAndConditionsSnippetComponent;
  let fixture: ComponentFixture<TermsAndConditionsSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndConditionsSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditionsSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
