import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ProfileDetailsService} from '@app/accounts/_services/profile-details.service';
import {ToastrService} from "ngx-toastr";
import {ConsentService} from '@app/accounts/_services/consent.service';
import {User} from '@app/_models';
import {Router} from '@angular/router';
import {ProfileDetailsForm} from "@app/accounts/_forms/profile-details.form";
import {AuthenticationService} from "@app/_services/api/authentication";

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
    formGroup: FormGroup;
    userConsent: boolean;
    userDetails: User;
    userId: number;
    logoPath = 'assets/global/logo.jpg';

    constructor(private router: Router,
                private profile: ProfileDetailsService,
                private toastr: ToastrService,
                private consentService: ConsentService,
                private authenticationService: AuthenticationService) {
        this.userId = this.authenticationService.currentUserValue.id;
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

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onSubmit(): void {
        const data = ProfileDetailsForm.extractData(this.formGroup);
        this.profile.putProfileDetails(data, this.userDetails.id)
            .subscribe(() => {
                this.toastr.success('Your profile has been updated successfully!');
            });
    }

    withdraw(): void {
        this.consentService.declineConsent().subscribe(() => {
            this.toastr.success('Your consent has been withdrawn successfully!');
        });
        this.userConsent = false;
    }
}
