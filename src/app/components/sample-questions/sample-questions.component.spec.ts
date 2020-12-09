import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SampleQuestionsComponent } from './sample-questions.component';

describe('SampleQuestionsComponent', () => {
  let component: SampleQuestionsComponent;
  let fixture: ComponentFixture<SampleQuestionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
