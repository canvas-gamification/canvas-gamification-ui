import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ConceptMapComponent} from '../../concept-map/concept-map.component';
import {TestModule} from '@test/test.module';
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {MOCK_CATEGORIES, MOCK_COURSE} from "@app/problems/_test/mock";
import {UserStatsComponent} from "@app/components/user-stats/user-stats.component";
import {TuiDialogService} from "@taiga-ui/core";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";

describe('ConceptMapComponent', () => {
    let component: ConceptMapComponent;
    let fixture: ComponentFixture<ConceptMapComponent>;
    let dialogService: TuiDialogService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [ConceptMapComponent, UserStatsComponent],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        dialogService = TestBed.inject(TuiDialogService);
        spyOn(dialogService, 'open').and.callFake(() => of());
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

    it('should generate user stats dialog service', () => {
        component.currCourse = MOCK_COURSE;
        component.generateUserStatsDialogService(0);
        expect(dialogService.open).toHaveBeenCalled();
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

    it('should show parent categories title when at the top-level of the concept map', () => {
        component.parentNode = null;
        component.renderGraph();
        const title = fixture.debugElement.query(By.css('.tui-text_h3')).nativeElement;
        expect(title.innerHTML).toEqual('Parent Categories');
    });

    it('should show sub categories title when within a parent category of the concept map', () => {
        component.parentNode = 1;
        component.renderGraph();
        fixture.detectChanges();
        const title = fixture.debugElement.query(By.css('.tui-text_h3')).nativeElement;
        expect(title.innerHTML).toEqual('Sub-Categories for Test #2');
    });
});
