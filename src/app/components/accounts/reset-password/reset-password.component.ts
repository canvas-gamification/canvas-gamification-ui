import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from '@app/_services/api/accounts/reset-password.service';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
    formData: FormGroup;
    logoPath = 'assets/global/logo.jpg';
    uuid: string;
    token: string;
    emailSent = false;

    constructor(private builder: FormBuilder,
                private resetPasswordService: ResetPasswordService,
                private toastr: ToastrService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.uuid = params.uuid;
            this.token = params.token;
        });
        if (this.uuid && this.token) {
            this.emailSent = true;
            this.formData = this.builder.group({
                password: new FormControl('', [Validators.required]),
                password2: new FormControl('', [Validators.required])
            });
        }
        if (!this.emailSent) {
            this.formData = this.builder.group({
                email: new FormControl('', [Validators.required])
            });
        }
    }

    onSubmit(formData: FormGroup): void {
        this.resetPasswordService.putPasswordReset({
            uid: this.uuid,
            token: this.token,
            ...formData.value
        })
            .subscribe((result) => {
                if (result.success != false) {
                    this.formData.reset();
                    this.toastr.success('Your password has been updated successfully!');
                    this.router.navigate(['/accounts/login']).then();
                }
            });
    }

    submitEmail(formData: FormGroup): void {
        this.resetPasswordService.sendForgotPasswordEmail(formData.get('email').value)
            .subscribe((result) => {
                if (result.success != false) {
                    this.formData.reset();
                    this.toastr.success('An email has been sent to you with a password reset link!');
                }
            });
    }
}
