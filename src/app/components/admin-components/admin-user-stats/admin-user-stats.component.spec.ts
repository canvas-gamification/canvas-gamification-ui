import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserStatsComponent } from './admin-user-stats.component';

describe('AdminUserStatsComponent', () => {
  let component: AdminUserStatsComponent;
  let fixture: ComponentFixture<AdminUserStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
