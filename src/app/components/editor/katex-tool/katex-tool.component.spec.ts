import {ComponentFixture, TestBed} from '@angular/core/testing';

import {KatexToolComponent} from './katex-tool.component';

describe('KatexToolComponent', () => {
    let component: KatexToolComponent;
    let fixture: ComponentFixture<KatexToolComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [KatexToolComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(KatexToolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
