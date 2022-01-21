import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsLinesComponent} from '../../problem-view/parsons-lines/parsons-lines.component';
import {DragulaService} from "ng2-dragula";
import {TuiIslandModule} from "@taiga-ui/kit";

describe('ParsonsLinesComponent', () => {
    let component: ParsonsLinesComponent;
    let fixture: ComponentFixture<ParsonsLinesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ParsonsLinesComponent],
            imports: [TuiIslandModule],
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
