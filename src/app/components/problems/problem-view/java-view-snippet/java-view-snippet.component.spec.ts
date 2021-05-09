import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JavaViewSnippetComponent} from './java-view-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_UQJ} from '@test/mock';

describe('JavaViewSnippetComponent', () => {
    let component: JavaViewSnippetComponent;
    let fixture: ComponentFixture<JavaViewSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JavaViewSnippetComponent);
        component = fixture.componentInstance;
        component.uqj = MOCK_UQJ;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
