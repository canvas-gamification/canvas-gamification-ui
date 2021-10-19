import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {environment} from '@environments/environment';
import {RegisterService} from '@app/accounts/_services/register.service';
import {ToastrService} from "ngx-toastr";
import {RegisterForm} from "@app/accounts/_forms/register.form";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";


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

    constructor(private register: RegisterService, private toastr: ToastrService) {
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
            this.toastr.success('You have successfully registered.');
            this.formSubmitted = true;
            this.isLoading = false;
        },
        () => {
            this.isLoading = false;
        });
    }
}
