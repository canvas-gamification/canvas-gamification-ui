import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JsonEditorComponent} from '../../json-editor/json-editor.component';
import {TestModule} from '@test/test.module';
import {SchemaService} from "@app/problems/_services/schema.service";
import {SchemaServiceMock} from "@app/problems/_test/_services/schema.service.mock";

describe('JsonEditorComponent', () => {
    let component: JsonEditorComponent;
    let fixture: ComponentFixture<JsonEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [JsonEditorComponent],
            providers: [{provide: SchemaService, useClass: SchemaServiceMock}]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JsonEditorComponent);
        component = fixture.componentInstance;
        component.name = 'TestSchema';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
