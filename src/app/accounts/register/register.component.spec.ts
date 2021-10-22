import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {TestModule} from '@test/test.module';
import {MOCK_STUDENT} from "@app/accounts/_test/mock";
import {of} from "rxjs";
import {RegisterForm} from "@app/accounts/_forms/register.form";

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should register user on form submit', () => {
        spyOn(component.formGroup, 'reset');
        spyOn(component['register'], 'postRegistration').and.returnValue(of(MOCK_STUDENT));
        component.form.email.setValue(MOCK_STUDENT.email);
        component.form.password.setValue('');
        component.form.password2.setValue('');
        component.form.recaptcha_key.setValue('');
        component.onSubmit();
        const formData = RegisterForm.extractData(component.formGroup);
        expect(component['register'].postRegistration).toHaveBeenCalledWith(formData);
        expect(component.formSubmitted).toBeTrue();
    });
});
