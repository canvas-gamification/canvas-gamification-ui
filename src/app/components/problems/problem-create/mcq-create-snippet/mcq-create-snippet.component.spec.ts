import {ComponentFixture, TestBed} from '@angular/core/testing';

import {McqCreateSnippetComponent} from './mcq-create-snippet.component';
import {TestModule} from '../../../../../test/test.module';

describe('McqCreateSnippetComponent', () => {
    let component: McqCreateSnippetComponent;
    let fixture: ComponentFixture<McqCreateSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(McqCreateSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
