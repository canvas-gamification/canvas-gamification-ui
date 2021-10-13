import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {ConsentService} from '@app/accounts/_services/consent.service';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from '@angular/router';
import {ConsentForm} from "@app/accounts/_forms/consent.form";
import {AuthenticationService} from "@app/_services/api/authentication";
import {User} from "@app/_models";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";


@Component({
    selector: 'app-consent-form',
    templateUrl: './consent-form.component.html',
    styleUrls: ['./consent-form.component.scss'],
    providers: [
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'This field is required!'
            },
        },
    ],
})
export class ConsentFormComponent implements OnInit {
    formGroup: FormGroup;
    logoPath = 'assets/global/logo.jpg';
    user: User;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private builder: FormBuilder,
                private consentService: ConsentService,
                private authenticationService: AuthenticationService,
                private toastr: ToastrService) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        if (this.user.is_student) {
            this.formGroup = ConsentForm.createStudentForm();
        } else {
            this.formGroup = ConsentForm.createAdminForm();
        }
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    redirectToProfile(): void {
        this.router.navigate(['accounts', 'profile']).then();
    }

    onSubmit(): void {
        const data = ConsentForm.extractData(this.formGroup);
        this.consentService.postConsent(data).subscribe(
            () => {
                this.toastr.success('You have successfully consented!');
                this.redirectToProfile();
            }
        );
    }

    declineConsent(): void {
        this.consentService.declineConsent().subscribe(() => {
            this.toastr.success('You successfully declined to consent.');
            this.redirectToProfile();
        });
    }
}
