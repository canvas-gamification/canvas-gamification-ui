import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ConceptMapComponent} from './concept-map.component';
import {TestModule} from '@test/test.module';

describe('ConceptMapComponent', () => {
    let component: ConceptMapComponent;
    let fixture: ComponentFixture<ConceptMapComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConceptMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
