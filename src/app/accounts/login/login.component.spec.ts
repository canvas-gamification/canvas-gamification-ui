import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {TestModule} from '@test/test.module';
import {TuiFieldErrorModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";
import {MOCK_STUDENT, MOCK_STUDENT_HAS_CONSENT} from "@app/accounts/_test/mock";
import {of} from "rxjs";

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, TuiInputModule, TuiTextfieldControllerModule, TuiFieldErrorModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        spyOn(component['router'], 'navigate');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should login when submitted and redirect consent', () => {
        spyOn(component['authenticationService'], 'login').and.returnValue(of(MOCK_STUDENT));
        component.form.email.setValue(MOCK_STUDENT.email);
        component.form.password.setValue("");
        component.onSubmit();
        expect(component['authenticationService'].login).toHaveBeenCalledWith(MOCK_STUDENT.email, "");
        expect(component['router'].navigate).toHaveBeenCalledWith(['/accounts/consent-form']);
    });

    it('should login when submitted and redirect homepage', () => {
        spyOn(component['authenticationService'], 'login').and.returnValue(of(MOCK_STUDENT_HAS_CONSENT));
        component.form.email.setValue(MOCK_STUDENT_HAS_CONSENT.email);
        component.form.password.setValue("");
        component.onSubmit();
        expect(component['authenticationService'].login).toHaveBeenCalledWith(MOCK_STUDENT_HAS_CONSENT.email, "");
        expect(component['router'].navigate).toHaveBeenCalledWith(['/homepage']);
    });

    it('should not login and give error', () => {
        spyOn(component['authenticationService'], 'login').and.returnValue(of(MOCK_STUDENT_HAS_CONSENT));
        component.form.email.setValue(MOCK_STUDENT_HAS_CONSENT.email);
        component.form.password.setValue("");
        component.onSubmit();
        expect(component['authenticationService'].login).toHaveBeenCalledWith(MOCK_STUDENT_HAS_CONSENT.email, "");
        expect(component['router'].navigate).toHaveBeenCalledWith(['/homepage']);
    });
});
