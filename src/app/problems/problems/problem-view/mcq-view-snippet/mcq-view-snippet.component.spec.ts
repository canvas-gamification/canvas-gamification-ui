import {ComponentFixture, TestBed} from '@angular/core/testing';

import {McqViewSnippetComponent} from './mcq-view-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_UQJ} from '@test/mock';

describe('McqViewSnippetComponent', () => {
    let component: McqViewSnippetComponent;
    let fixture: ComponentFixture<McqViewSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(McqViewSnippetComponent);
        component = fixture.componentInstance;
        component.uqj = MOCK_UQJ;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
