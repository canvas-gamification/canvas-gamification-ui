import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryListSnippetComponent} from './category-list-snippet.component';

describe('CategoryListComponent', () => {
    let component: CategoryListSnippetComponent;
    let fixture: ComponentFixture<CategoryListSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoryListSnippetComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryListSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
