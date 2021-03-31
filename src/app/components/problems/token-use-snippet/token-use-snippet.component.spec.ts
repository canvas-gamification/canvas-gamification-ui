import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenUseSnippetComponent } from './token-use-snippet.component';

describe('TokenUseSnippetComponent', () => {
  let component: TokenUseSnippetComponent;
  let fixture: ComponentFixture<TokenUseSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenUseSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenUseSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
