import {Component, Inject, OnInit} from '@angular/core'
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms'
import {ConsentService} from '@app/accounts/_services/consent.service'
import {ActivatedRoute, Router} from '@angular/router'
import {ConsentForm} from "@app/accounts/_forms/consent.form"
import {AuthenticationService} from "@app/_services/api/authentication"
import {User} from "@app/_models"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"


@Component({
    selector: 'app-consent-form',
    templateUrl: './consent-form.component.html',
    styleUrls: ['./consent-form.component.scss']
})
export class ConsentFormComponent implements OnInit {
    formGroup: FormGroup
    logoPath = 'assets/global/logo.jpg'
    user: User

    genders = ['MALE', 'FEMALE', 'NB', 'OTHER', 'N/A']
    genderMapper = {
        'MALE': 'Male',
        'FEMALE': 'Female',
        'NB': 'Non-binary',
        'OTHER': 'Other',
        'N/A': 'Prefer not to answer',
    }

    races = [
        'African',
        'European',
        'East Asian',
        'South Asian',
        'South East Asian',
        'First Nations or Indigenous',
        'Hispanic or Latinx',
        'Middle Eastern',
        'Other',
        'Prefer not to answer',
    ]

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private builder: FormBuilder,
        private consentService: ConsentService,
        private authenticationService: AuthenticationService,
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService
    ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls
    }

    ngOnInit(): void {
        if (this.user.is_student) {
            this.formGroup = ConsentForm.createStudentForm(this.user)
        } else {
            this.formGroup = ConsentForm.createAdminForm(this.user)
        }
    }

    redirectAfterSubmit(): void {
        this.router.navigate(['/homepage']).then()
    }

    onSubmit(): void {
        const data = ConsentForm.extractData(this.formGroup)
        this.consentService.postConsent(data).subscribe(() => {
            this.notificationsService
                .show('You have successfully consented!', {
                    status: TuiNotification.Success
                }).subscribe()
            this.redirectAfterSubmit()
        })
    }

    declineConsent(): void {
        this.consentService.declineConsent().subscribe(() => {
            this.notificationsService
                .show('You successfully declined to consent.', {
                    status: TuiNotification.Success
                }).subscribe()
            this.redirectAfterSubmit()
        })
    }
}
