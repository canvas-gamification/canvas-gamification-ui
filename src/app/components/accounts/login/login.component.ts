import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthenticationService} from '@app/_services/api/authentication';
import {ConsentService} from '@app/_services/api/accounts/consent.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private consentService: ConsentService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/homepage']).then();
        }
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f(): { [p: string]: AbstractControl } {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.consentService.getConsent().subscribe((consents) => {
                        if (consents.length === 0) {
                            this.router.navigate(['/accounts/consent-form']).then();
                        } else {
                            // get return url from route parameters or default to '/'
                            const returnUrl = this.route.snapshot.queryParams.returnUrl || '/homepage';
                            this.router.navigate([returnUrl]).then();
                        }
                    });
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}
