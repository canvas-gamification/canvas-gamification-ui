import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsViewSnippetComponent} from './parsons-view-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_UQJ} from '@test/mock';

describe('ParsonsViewSnippetComponent', () => {
    let component: ParsonsViewSnippetComponent;
    let fixture: ComponentFixture<ParsonsViewSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ParsonsViewSnippetComponent);
        component = fixture.componentInstance;
        component.uqj = MOCK_UQJ;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
