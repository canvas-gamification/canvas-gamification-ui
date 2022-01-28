import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PracticeProblemComponent} from './practice-problem.component';

describe('PracticeProblemComponent', () => {
    let component: PracticeProblemComponent;
    let fixture: ComponentFixture<PracticeProblemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PracticeProblemComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PracticeProblemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
