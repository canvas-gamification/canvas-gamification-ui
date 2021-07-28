import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndividualLeaderBoardComponent} from './individual-leader-board.component';
import {TestModule} from "@test/test.module";

describe('LeaderboardComponent', () => {
    let component: IndividualLeaderBoardComponent;
    let fixture: ComponentFixture<IndividualLeaderBoardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IndividualLeaderBoardComponent],
            imports: [TestModule]
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
