import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ConceptMapComponent} from '../../concept-map/concept-map.component';
import {TestModule} from '@test/test.module';
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {MOCK_CATEGORIES} from "@app/problems/_test/mock";

describe('ConceptMapComponent', () => {
    let component: ConceptMapComponent;
    let fixture: ComponentFixture<ConceptMapComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [ConceptMapComponent],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConceptMapComponent);
        component = fixture.componentInstance;
        spyOn(component, 'renderGraph');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fill with categories on load', () => {
        expect(component.rawCategories).toEqual(MOCK_CATEGORIES);
    });

    it('should call render graph once categories are loaded', () => {
        expect(component.renderGraph).toHaveBeenCalled();
    });

    it('reset method should work', () => {
        component.reset();
        expect(component.parentNode).toBeNull();
        expect(component.renderGraph).toHaveBeenCalled();
    });

    it('isTopLevel should work', () => {
        expect(component.isTopLevel(0)).toBeTruthy();
        expect(component.isTopLevel(1)).toBeFalsy();
    });
});

describe('ConceptMapComponent without spy', () => {
    let component: ConceptMapComponent;
    let fixture: ComponentFixture<ConceptMapComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [ConceptMapComponent],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConceptMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('renderGraph should work with valid parentId', () => {
        component.parentNode = 0;
        spyOn(component.conceptMapGraph, 'buildGraphFromAdjacencyList');
        component.renderGraph();
        expect(component.conceptMapGraph.buildGraphFromAdjacencyList).toHaveBeenCalled();
    });
});
