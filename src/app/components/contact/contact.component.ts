import {Component, Inject, OnInit} from '@angular/core'
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms'
import {ContactService} from '@app/_services/api/contact.service'
import {environment} from '@environments/environment'
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    formData: UntypedFormGroup
    siteKey: string = environment.siteKey

    constructor(
        private builder: UntypedFormBuilder,
        private contact: ContactService,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService
    ) {
    }

    ngOnInit(): void {
        this.formData = this.builder.group({
            fullname: new UntypedFormControl('', [Validators.required]),
            email: new UntypedFormControl('', [Validators.required, Validators.email]),
            comment: new UntypedFormControl('', [Validators.required]),
            recaptcha_key: new UntypedFormControl(null, [Validators.required])
        })
    }

    onSubmit(formData: { fullname: string, email: string, comment: string, recaptcha_key: string }): void {
        this.contact.postMessage(formData)
            .subscribe(() => {
                this.formData.reset()
                this.notificationsService
                    .show('Your comment have been successfully sent!', {
                        status: TuiNotification.Success
                    }).subscribe()
            }, error => {
                console.warn(error)
                this.notificationsService
                    .show(error, {
                        status: TuiNotification.Error
                    }).subscribe()
            })
    }
}
