import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenValuesComponent } from './token-values.component';

describe('TokenValuesComponent', () => {
  let component: TokenValuesComponent;
  let fixture: ComponentFixture<TokenValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
