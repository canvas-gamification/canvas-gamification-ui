import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {ResetPasswordService} from '@app/accounts/_services/reset-password.service';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ResetPasswordForm} from "@app/accounts/_forms/reset-password.form";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
    formGroup: FormGroup;
    logoPath = 'assets/global/logo.jpg';
    emailSent = false;

    constructor(private builder: FormBuilder,
                private resetPasswordService: ResetPasswordService,
                private toastr: ToastrService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    ngOnInit(): void {
        const uuid = this.route.snapshot.params.uuid;
        const token = this.route.snapshot.params.token;
        if (uuid && token) {
            this.emailSent = true;
            this.formGroup = ResetPasswordForm.createPasswordForm(uuid, token);
        }
        if (!this.emailSent) {
            this.formGroup = ResetPasswordForm.createEmailForm();
        }
    }

    /**
     * Submit new password form.
     */
    onSubmit(): void {
        const data = ResetPasswordForm.extractPasswordFormData(this.formGroup);
        this.resetPasswordService.putPasswordReset(data).subscribe((response) => {
            if (response.status === 201) {
                this.router.navigate(['/accounts/login']).then(() => {
                    this.toastr.success('Your password has been updated successfully!');
                });
            }
        });
    }

    /**
     * Send email.
     */
    submitEmail(): void {
        const data = ResetPasswordForm.extractEmailFormData(this.formGroup);
        this.resetPasswordService.sendForgotPasswordEmail(data)
            .subscribe((response) => {
                if (response.status === 200) {
                    this.formGroup.reset();
                    this.toastr.success('An email has been sent to you with a password reset link!');
                }
            });
    }
}
