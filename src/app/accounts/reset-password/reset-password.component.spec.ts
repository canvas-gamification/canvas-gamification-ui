import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResetPasswordComponent} from './reset-password.component';
import {TestModule} from '@test/test.module';
import {MOCK_EMAIL_FORM_DATA, MOCK_PASSWORD_FORM_DATA} from "@app/accounts/_test/mock";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {HttpHeaderResponse} from "@angular/common/http";

describe('ResetPasswordComponent', () => {
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit password reset request', () => {
        spyOn(component['resetPasswordService'], 'sendForgotPasswordEmail').and.returnValue(of(new HttpHeaderResponse()));
        spyOn(component.formGroup, 'reset');
        component.form.email.setValue(MOCK_EMAIL_FORM_DATA.email);
        component.submitEmail();
        expect(component['resetPasswordService'].sendForgotPasswordEmail).toHaveBeenCalledWith(MOCK_EMAIL_FORM_DATA);
        expect(component.formGroup.reset).toHaveBeenCalled();
    });
});

describe('ResetPasswordComponentLinkClicked', () => {
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            params: {
                                uuid: MOCK_PASSWORD_FORM_DATA.uuid,
                                token: MOCK_PASSWORD_FORM_DATA.token
                            }
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should reset password', () => {
        spyOn(component['resetPasswordService'], 'putPasswordReset').and.returnValue(of(new HttpHeaderResponse()));
        spyOn(component['router'], 'navigate');
        component.form.password.setValue(MOCK_PASSWORD_FORM_DATA.password);
        component.form.password2.setValue(MOCK_PASSWORD_FORM_DATA.password2);
        component.onSubmit();
        expect(component['resetPasswordService'].putPasswordReset).toHaveBeenCalledWith(MOCK_PASSWORD_FORM_DATA);
        expect(component['router'].navigate).toHaveBeenCalled();
    });
});
