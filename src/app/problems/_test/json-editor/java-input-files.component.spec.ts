import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JavaInputFilesComponent} from '../../json-editor/java-input-files/java-input-files.component';
import {TestModule} from "@test/test.module";
import {TuiCheckboxLabeledModule, TuiFieldErrorModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";

describe('JavaInputFilesComponent', () => {
    let component: JavaInputFilesComponent;
    let fixture: ComponentFixture<JavaInputFilesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [JavaInputFilesComponent],
            imports: [
                TestModule, ReactiveFormsModule, TuiInputModule, TuiCheckboxLabeledModule,
                TuiFieldErrorModule, TuiIslandModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JavaInputFilesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
