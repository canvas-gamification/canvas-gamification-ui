import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsLinesComponent} from './parsons-lines.component';
import {DragulaService} from "ng2-dragula";

describe('ParsonsLinesComponent', () => {
    let component: ParsonsLinesComponent;
    let fixture: ComponentFixture<ParsonsLinesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ParsonsLinesComponent],
            providers: [DragulaService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ParsonsLinesComponent);
        component = fixture.componentInstance;
        component.file = {
            name: 'test',
            lines: ['a', 'b', 'c'],
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
