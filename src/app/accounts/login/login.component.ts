import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthenticationService} from '@app/_services/api/authentication';
import {LoginForm} from "@app/accounts/_forms/login.form";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'This field is required!',
                email: 'Enter a valid email address!'
            },
        },
    ],
})
export class LoginComponent implements OnInit {
    formGroup: FormGroup;
    loading = false;
    error = '';
    logoPath = 'assets/global/logo.jpg';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/homepage']).then();
        }
    }

    ngOnInit(): void {
        this.formGroup = LoginForm.createForm();
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onSubmit(): void {
        this.loading = true;
        this.authenticationService.login(this.form.username.value, this.form.password.value)
            .pipe(first())
            .subscribe({
                next: (user) => {
                    if (!user.has_consent) {
                        this.router.navigate(['/accounts/consent-form']).then();
                    } else {
                        // get return url from route parameters or default to '/'
                        const returnUrl = this.route.snapshot.queryParams.returnUrl || '/homepage';
                        this.router.navigate([returnUrl]).then();
                    }
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}
