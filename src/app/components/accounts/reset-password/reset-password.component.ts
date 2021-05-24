import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from '@app/_services/api/accounts/reset-password.service';
import {MessageService} from '@app/_services/message.service';
import {MESSAGE_TYPES} from '@app/_models';
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
                private messageService: MessageService,
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
                old_password: new FormControl('', [Validators.required]),
                password: new FormControl('', [Validators.required]),
                password2: new FormControl('', [Validators.required])
            });
            this.resetPasswordService.validateToken(this.uuid, this.token).subscribe(() => {
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'Link is valid, please reset your password');
            }, error => {
                this.messageService.add(MESSAGE_TYPES.DANGER, error);
                this.formData.disable();
            });
        } else {
            this.formData = this.builder.group({
                email: new FormControl('', [Validators.required])
            });
        }
    }

    onSubmit(formData: FormGroup): void {
        this.resetPasswordService.putPasswordReset({
            uid: this.uuid,
            ...formData.value
        })
            .subscribe(() => {
                this.formData.reset();
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'Your password has been updated successfully!');
                this.router.navigate(['/accounts/login']).then();
            }, error => {
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
            });
    }

    submitEmail(formData: FormGroup): void {
        this.resetPasswordService.sendEmail(formData.get('email').value)
            .subscribe(() => {
                this.formData.reset();
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'An email has been sent to you with a password reset link!');
            }, error => {
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText + '. Try checking the email you entered');
            });
    }
}
