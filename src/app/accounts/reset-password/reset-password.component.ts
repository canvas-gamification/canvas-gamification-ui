import {Component, Inject, OnInit} from '@angular/core'
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms'
import {ResetPasswordService} from '@app/accounts/_services/reset-password.service'
import {ActivatedRoute, Router} from "@angular/router"
import {ResetPasswordForm} from "@app/accounts/_forms/reset-password.form"
import { TuiAlertService } from "@taiga-ui/core"

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    formGroup: UntypedFormGroup
    logoPath = 'assets/global/logo.jpg'
    emailSent = false

    constructor(
        private builder: UntypedFormBuilder,
        private resetPasswordService: ResetPasswordService,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(TuiAlertService) private readonly notificationsService: TuiAlertService
    ) {
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls
    }

    ngOnInit(): void {
        const uid = this.route.snapshot.params.uid
        const token = this.route.snapshot.params.token
        if (uid && token) {
            this.emailSent = true
            this.formGroup = ResetPasswordForm.createPasswordForm(uid, token)
        }
        if (!this.emailSent) {
            this.formGroup = ResetPasswordForm.createEmailForm()
        }
    }

    /**
     * Submit new password form.
     */
    onSubmit(): void {
        const data = ResetPasswordForm.extractPasswordFormData(this.formGroup)
        this.resetPasswordService.putPasswordReset(data).subscribe(() => {
            this.router.navigate(['/accounts/login']).then(() => {
                this.notificationsService
                    .open('Your password has been updated successfully!', {
                        appearance: 'success'
                    }).subscribe()
            })
        })
    }

    /**
     * Send email.
     */
    submitEmail(): void {
        const data = ResetPasswordForm.extractEmailFormData(this.formGroup)
        this.resetPasswordService.sendForgotPasswordEmail(data)
            .subscribe(() => {
                this.formGroup.reset()
                this.notificationsService
                    .open('An email has been sent to you with a password reset link!', {
                        appearance: 'info'
                    }).subscribe()
            })
    }
}
