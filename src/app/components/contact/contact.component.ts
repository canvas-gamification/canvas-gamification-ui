import {Component, Inject, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {ContactService} from '@app/_services/api/contact.service'
import {environment} from '@environments/environment'
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    formData: FormGroup
    siteKey: string = environment.siteKey

    constructor(
        private builder: FormBuilder,
        private contact: ContactService,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService
    ) {
    }

    ngOnInit(): void {
        this.formData = this.builder.group({
            fullname: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            comment: new FormControl('', [Validators.required]),
            recaptcha_key: new FormControl(null, [Validators.required])
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
