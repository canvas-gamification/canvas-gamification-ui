import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTokensComponent } from './individual-tokens.component';

describe('IndividualTokenComponentComponent', () => {
  let component: IndividualTokensComponent;
  let fixture: ComponentFixture<IndividualTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualTokensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
