import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubmissionViewComponent} from '../../submission-view/submission-view.component';
import {TestModule} from '@test/test.module';

describe('SubmissionViewComponent', () => {
    let component: SubmissionViewComponent;
    let fixture: ComponentFixture<SubmissionViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
});
