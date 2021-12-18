import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {environment} from '@environments/environment';
import {RegisterService} from '@app/accounts/_services/register.service';
import {RegisterForm} from "@app/accounts/_forms/register.form";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {TuiNotification, TuiNotificationsService} from '@taiga-ui/core';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'This field is required!',
                email: 'Enter a valid email address!',
                minlength: 'Password must contain at least 8 characters.',
                confirmedValidator: 'Passwords must match!'
            },
        },
    ],
})
export class RegisterComponent implements OnInit {
    formGroup: FormGroup;
    siteKey = environment.siteKey;
    formSubmitted = false;
    isLoading = false;
    logoPath = 'assets/global/logo.jpg';

    constructor(private register: RegisterService,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    ngOnInit(): void {
        this.formGroup = RegisterForm.createForm();
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onSubmit(): void {
        const data = RegisterForm.extractData(this.formGroup);
        this.isLoading = true;
        this.register.postRegistration(data).subscribe(() => {
            this.formGroup.reset();
            this.notificationsService
                .show('You have successfully registered.', {
                    status: TuiNotification.Success
                }).subscribe();
            this.formSubmitted = true;
            this.isLoading = false;
        },
        () => {
            this.isLoading = false;
        });
    }
}
