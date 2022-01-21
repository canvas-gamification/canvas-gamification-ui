import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TestCasesComponent} from '../../json-editor/test-cases/test-cases.component';
import {TestModule} from "@test/test.module";
import {TuiCheckboxLabeledModule, TuiFieldErrorModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";

describe('TestCasesComponent', () => {
    let component: TestCasesComponent;
    let fixture: ComponentFixture<TestCasesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestCasesComponent],
            imports: [
                TestModule, ReactiveFormsModule, TuiInputModule, TuiCheckboxLabeledModule,
                TuiFieldErrorModule, TuiIslandModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCasesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
