import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileDetailsService} from '@app/_services/api/accounts/profile-details.service';
import {MessageService} from '@app/_services/message.service';
import {ConsentService} from '@app/_services/api/accounts/consent.service';
import {MESSAGE_TYPES, User} from '@app/_models';
import {Router} from '@angular/router';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDetailsComponent implements OnInit {
    FormData: FormGroup;
    UserConsent: boolean;
    UserDetails: User;

    constructor(private router: Router,
                private builder: FormBuilder,
                private profile: ProfileDetailsService,
                private messageService: MessageService,
                private consentService: ConsentService) {
    }

    ngOnInit(): void {
        this.FormData = this.builder.group({
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
        });

        this.consentService.getConsent().subscribe(consents => {
            this.UserConsent = consents[consents.length - 1].consent;
        });
        this.profile.GetProfileDetails().subscribe((details: User) => {
            this.UserDetails = details;
            this.FormData.controls.first_name.setValue(this.UserDetails[0].first_name);
            this.FormData.controls.last_name.setValue(this.UserDetails[0].last_name);
            this.FormData.controls.email.setValue(this.UserDetails[0].email);
        });
    }

    onSubmit(FormData: unknown): void {
        this.profile.PutProfileDetails(FormData, this.UserDetails[0].id)
            .subscribe(() => {
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'Your profile has been updated successfully!');
            }, error => {
                console.warn(error.responseText);
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
            });
    }

    withdraw(): void {
        this.consentService.postConsent({
            consent: false,
            legal_first_name: '',
            legal_last_name: '',
            student_number: '',
            date: ''
        }).subscribe(() => {
            this.messageService.add(MESSAGE_TYPES.SUCCESS, 'Your consent has been withdrawn successfully!');
        }, error => {
            console.warn(error.responseText);
            this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
        });
        this.UserConsent = false;
    }
}
