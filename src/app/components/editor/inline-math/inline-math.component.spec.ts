import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InlineMathComponent} from './inline-math.component';

describe('InlineMathComponent', () => {
    let component: InlineMathComponent;
    let fixture: ComponentFixture<InlineMathComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InlineMathComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InlineMathComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
