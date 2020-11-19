import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptMapComponent } from './concept-map.component';

describe('ConceptMapComponent', () => {
  let component: ConceptMapComponent;
  let fixture: ComponentFixture<ConceptMapComponent>;

  beforeEach(async(() => {
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
