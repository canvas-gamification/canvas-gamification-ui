import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {ResetPasswordService} from '@app/accounts/_services/reset-password.service';
import {ActivatedRoute, Router} from "@angular/router";
import {ResetPasswordForm} from "@app/accounts/_forms/reset-password.form";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";

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
                private route: ActivatedRoute,
                private router: Router,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
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
        this.resetPasswordService.putPasswordReset(data).subscribe(() => {
            this.router.navigate(['/accounts/login']).then(() => {
                this.notificationsService
                    .show('Your password has been updated successfully!', {
                        status: TuiNotification.Success
                    }).subscribe();
            });
        });
    }

    /**
     * Send email.
     */
    submitEmail(): void {
        const data = ResetPasswordForm.extractEmailFormData(this.formGroup);
        this.resetPasswordService.sendForgotPasswordEmail(data)
            .subscribe(() => {
                this.formGroup.reset();
                this.notificationsService
                    .show('An email has been sent to you with a password reset link!', {
                        status: TuiNotification.Info
                    }).subscribe();
            });
    }
}
