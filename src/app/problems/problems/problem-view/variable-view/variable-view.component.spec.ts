import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VariableViewComponent} from './variable-view.component';
import {TestModule} from '@test/test.module';

describe('VariableViewComponent', () => {
    let component: VariableViewComponent;
    let fixture: ComponentFixture<VariableViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VariableViewComponent);
        component = fixture.componentInstance;
        component.variables = [];
        component.variableErrors = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
