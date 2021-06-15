import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProblemSetComponent} from './problem-set.component';
import {TestModule} from '@test/test.module';

describe('ProblemSetComponent', () => {
    let component: ProblemSetComponent;
    let fixture: ComponentFixture<ProblemSetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProblemSetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
