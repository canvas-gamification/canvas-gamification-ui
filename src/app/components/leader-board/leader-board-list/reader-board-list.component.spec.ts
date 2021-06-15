import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LeaderBoardListComponent} from './leader-board-list.component';
import {TestModule} from '../../../../test/test.module';

describe('LeaderBoardComponent', () => {
    let component: LeaderBoardListComponent;
    let fixture: ComponentFixture<LeaderBoardListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LeaderBoardListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
