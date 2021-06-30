import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProblemCreateComponent} from '../../problem-create/problem-create.component';
import {TestModule} from '@test/test.module';

describe('ProblemCreateComponent', () => {
    let component: ProblemCreateComponent;
    let fixture: ComponentFixture<ProblemCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProblemCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
