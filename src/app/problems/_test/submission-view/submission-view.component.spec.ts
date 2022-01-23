import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubmissionViewComponent} from '../../submission-view/submission-view.component';
import {TestModule} from '@test/test.module';
import {DatePipe} from "@angular/common";

describe('SubmissionViewComponent', () => {
    let component: SubmissionViewComponent;
    let fixture: ComponentFixture<SubmissionViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SubmissionViewComponent, DatePipe],
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SubmissionViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get status', () => {
        expect(component.getSubmissionTagStatus('Correct')).toEqual('success');
        expect(component.getSubmissionTagStatus('Wrong')).toEqual('error');
        expect(component.getSubmissionTagStatus('Other Statuses')).toEqual('default');
    });
});
