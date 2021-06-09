import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileDetailsService} from '@app/accounts/_services/profile-details.service';
import {ToastrService} from "ngx-toastr";
import {ConsentService} from '@app/accounts/_services/consent.service';
import {User} from '@app/_models';
import {Router} from '@angular/router';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
    formData: FormGroup;
    userConsent: boolean;
    userDetails: User;
    logoPath = 'assets/global/logo.jpg';

    constructor(private router: Router,
                private builder: FormBuilder,
                private profile: ProfileDetailsService,
                private toastr: ToastrService,
                private consentService: ConsentService) {
    }

    ngOnInit(): void {
        this.formData = this.builder.group({
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
        });

        this.consentService.getConsent().subscribe(consents => {
            this.userConsent = consents[consents.length - 1].consent;
        });
        this.profile.getProfileDetails().subscribe((details: User) => {
            this.userDetails = details;
            this.formData.controls.first_name.setValue(this.userDetails[0].first_name);
            this.formData.controls.last_name.setValue(this.userDetails[0].last_name);
            this.formData.controls.email.setValue(this.userDetails[0].email);
        });
    }

    onSubmit(formData: FormGroup): void {
        this.profile.putProfileDetails(formData.value, this.userDetails[0].id)
            .subscribe(() => {
                this.toastr.success('Your profile has been updated successfully!');
            });
    }

    withdraw(): void {
        this.consentService.declineConsent().subscribe(() => {
            this.toastr.success('Your consent has been withdrawn successfully!');
        }, error => {
            console.warn(error);
            this.toastr.error(error);
        });
        this.userConsent = false;
    }
}
