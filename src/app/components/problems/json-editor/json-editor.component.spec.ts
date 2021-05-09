import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JsonEditorComponent} from './json-editor.component';
import {TestModule} from '../../../../test/test.module';

describe('JsonEditorComponent', () => {
    let component: JsonEditorComponent;
    let fixture: ComponentFixture<JsonEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JsonEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
