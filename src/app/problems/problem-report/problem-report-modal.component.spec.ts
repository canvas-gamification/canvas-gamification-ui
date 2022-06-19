import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProblemReportModalComponent} from './problem-report-modal.component';

describe('ProblemReportComponent', () => {
    let component: ProblemReportModalComponent;
    let fixture: ComponentFixture<ProblemReportModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProblemReportModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProblemReportModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
