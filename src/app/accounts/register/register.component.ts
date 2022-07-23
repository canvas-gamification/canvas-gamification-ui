import {Component, Inject, OnInit} from '@angular/core'
import {AbstractControl, FormGroup} from '@angular/forms'
import {environment} from '@environments/environment'
import {RegisterService} from '@app/accounts/_services/register.service'
import {RegisterForm} from "@app/accounts/_forms/register.form"
import {TuiNotification, TuiNotificationsService} from '@taiga-ui/core'


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    formGroup: FormGroup
    siteKey = environment.siteKey
    formSubmitted = false
    isLoading = false
    logoPath = 'assets/global/logo.jpg'

    constructor(private register: RegisterService,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls
    }

    ngOnInit(): void {
        this.formGroup = RegisterForm.createForm()
    }

    onSubmit(): void {
        const data = RegisterForm.extractData(this.formGroup)
        this.isLoading = true
        this.register.postRegistration(data).subscribe(() => {
            this.formGroup.reset()
            this.notificationsService
                .show('You have successfully registered.', {
                    status: TuiNotification.Success
                }).subscribe()
            this.formSubmitted = true
            this.isLoading = false
        },
        () => {
            this.isLoading = false
        })
    }
}
