import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndividualLeaderBoardComponent} from './individual-leader-board.component';

describe('LeaderboardComponent', () => {
    let component: IndividualLeaderBoardComponent;
    let fixture: ComponentFixture<IndividualLeaderBoardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IndividualLeaderBoardComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IndividualLeaderBoardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
