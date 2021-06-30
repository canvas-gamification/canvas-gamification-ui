import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AceComponent} from './ace.component';
import {TestModule} from '@test/test.module';
import {AceEditorModule} from "ng2-ace-editor";

describe('AceComponent', () => {
    let component: AceComponent;
    let fixture: ComponentFixture<AceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AceComponent],
            imports: [TestModule, AceEditorModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
