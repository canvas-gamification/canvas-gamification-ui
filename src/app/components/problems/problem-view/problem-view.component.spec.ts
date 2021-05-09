import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProblemViewComponent} from './problem-view.component';
import {TestModule} from '../../../../test/test.module';

describe('ProblemViewComponent', () => {
    let component: ProblemViewComponent;
    let fixture: ComponentFixture<ProblemViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProblemViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
