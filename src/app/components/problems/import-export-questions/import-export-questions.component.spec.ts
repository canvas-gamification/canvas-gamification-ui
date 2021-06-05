import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportExportQuestionsComponent} from './import-export-questions.component';

describe('ImportExportQuestionsComponent', () => {
    let component: ImportExportQuestionsComponent;
    let fixture: ComponentFixture<ImportExportQuestionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImportExportQuestionsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImportExportQuestionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
