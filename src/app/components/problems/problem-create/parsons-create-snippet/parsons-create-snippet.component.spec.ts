import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsCreateSnippetComponent} from './parsons-create-snippet.component';
import {TestModule} from '../../../../../test/test.module';

describe('ParsonsCreateSnippetComponent', () => {
    let component: ParsonsCreateSnippetComponent;
    let fixture: ComponentFixture<ParsonsCreateSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ParsonsCreateSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
