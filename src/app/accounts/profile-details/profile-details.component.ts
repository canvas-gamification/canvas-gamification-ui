import {AfterContentChecked, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ProfileDetailsService} from '@app/accounts/_services/profile-details.service';
import {ConsentService} from '@app/accounts/_services/consent.service';
import {User} from '@app/_models';
import {Router} from '@angular/router';
import {ProfileDetailsForm} from "@app/accounts/_forms/profile-details.form";
import {AuthenticationService} from "@app/_services/api/authentication";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
    providers: [
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'This field is required!',
                email: 'Enter a valid email address!',
            },
        },
    ],
})
export class ProfileDetailsComponent implements OnInit, AfterContentChecked {
    formGroup: FormGroup;
    userConsent: boolean;
    userDetails: User;
    userId: number;

    constructor(private router: Router,
                private profile: ProfileDetailsService,
                private consentService: ConsentService,
                private authenticationService: AuthenticationService,
                private changeDetector: ChangeDetectorRef,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
        this.userId = this.authenticationService.currentUserValue?.id;
    }

    ngOnInit(): void {
        this.formGroup = ProfileDetailsForm.createForm();
        this.consentService.getConsent().subscribe(consents => {
            this.userConsent = consents[consents.length - 1].consent;
        });
        this.profile.getProfileDetails(this.userId).subscribe((details: User) => {
            this.userDetails = details;
            ProfileDetailsForm.updateData(this.formGroup, details);
        });
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onSubmit(): void {
        const data = ProfileDetailsForm.extractData(this.formGroup);
        this.profile.putProfileDetails(data, this.userDetails.id)
            .subscribe(() => {
                this.notificationsService
                    .show('Your profile has been updated successfully!', {
                        status: TuiNotification.Success
                    }).subscribe();
            });
    }

    withdraw(): void {
        this.consentService.declineConsent().subscribe(() => {
            this.notificationsService
                .show('Your consent has been withdrawn successfully!', {
                    status: TuiNotification.Success
                }).subscribe();
        });
        this.userConsent = false;
    }
}
