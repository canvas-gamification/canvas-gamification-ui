import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConceptMapComponent } from './concept-map.component';

describe('ConceptMapComponent', () => {
  let component: ConceptMapComponent;
  let fixture: ComponentFixture<ConceptMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
