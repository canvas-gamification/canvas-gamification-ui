import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CkEditorComponent} from './ck-editor.component';

describe('CkEditorComponent', () => {
    let component: CkEditorComponent;
    let fixture: ComponentFixture<CkEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CkEditorComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CkEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
