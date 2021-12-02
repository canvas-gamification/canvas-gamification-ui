import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LeaderBoardComponent} from '../../leader-board/leader-board.component';
import {TestModule} from '@test/test.module';
import {MOCK_COURSE2} from "@app/course/_test/mock";
import {TuiFilterPipeModule} from "@taiga-ui/cdk";

describe('LeaderBoardComponent', () => {
    let component: LeaderBoardComponent;
    let fixture: ComponentFixture<LeaderBoardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, TuiFilterPipeModule],
            declarations: [LeaderBoardComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LeaderBoardComponent);
        component = fixture.componentInstance;
        component.leaderBoard = MOCK_COURSE2.leader_board;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be a ranked leaderboard', () => {
        let prevRank = 0;
        component.leaderBoard.forEach(leaderBoardElement => {
            expect(leaderBoardElement.rank).toEqual(prevRank + 1);
            prevRank = leaderBoardElement.rank;
        });
    });

    it('should add ordinal to number', () => {
        expect(component.getGetOrdinal(1)).toEqual('1st');
        expect(component.getGetOrdinal(2)).toEqual('2nd');
        expect(component.getGetOrdinal(3)).toEqual('3rd');
        expect(component.getGetOrdinal(4)).toEqual('4th');
        expect(component.getGetOrdinal(11)).toEqual('11th');
        expect(component.getGetOrdinal(12)).toEqual('12th');
        expect(component.getGetOrdinal(13)).toEqual('13th');
    });
});
