import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LeaderBoardComponent} from './leader-board.component';
import {TestModule} from '../../../test/test.module';

describe('LeaderBoardComponent', () => {
    let component: LeaderBoardComponent;
    let fixture: ComponentFixture<LeaderBoardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LeaderBoardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
