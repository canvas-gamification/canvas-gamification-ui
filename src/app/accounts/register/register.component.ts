import { TuiNotificationService } from "@taiga-ui/core";
import {Component, Inject, OnInit, ChangeDetectionStrategy} from '@angular/core'
import {AbstractControl, UntypedFormGroup} from '@angular/forms'
import {environment} from '@environments/environment'
import {RegisterService} from '@app/accounts/_services/register.service'
import {RegisterForm} from "@app/accounts/_forms/register.form"

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RegisterComponent implements OnInit {
    formGroup: UntypedFormGroup
    siteKey = environment.siteKey
    formSubmitted = false
    isLoading = false
    logoPath = 'assets/global/logo.jpg'

    constructor(
        private register: RegisterService,
        @Inject(TuiNotificationService) private readonly notificationsService: TuiNotificationService
    ) {
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
        this.register.postRegistration(data).subscribe(
            () => {
                this.formGroup.reset()
                this.notificationsService
                    .open('You have successfully registered.', {
                        appearance: 'success'
                    }).subscribe()
                this.formSubmitted = true
                this.isLoading = false
            },
            () => {
                this.isLoading = false
            }
        )
    }
}
