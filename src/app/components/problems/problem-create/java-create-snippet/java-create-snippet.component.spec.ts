import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JavaCreateSnippetComponent} from './java-create-snippet.component';
import {TestModule} from '../../../../../test/test.module';

describe('JavaCreateSnippetComponent', () => {
    let component: JavaCreateSnippetComponent;
    let fixture: ComponentFixture<JavaCreateSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JavaCreateSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
