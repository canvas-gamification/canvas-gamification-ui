import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserStatsComponent} from './user-stats.component';
import {TestModule} from '../../../test/test.module';

describe('UserStatsComponent', () => {
    let component: UserStatsComponent;
    let fixture: ComponentFixture<UserStatsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
