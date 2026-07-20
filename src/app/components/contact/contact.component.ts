import { TuiNotificationService } from "@taiga-ui/core";
import {Component, Inject, OnInit, ChangeDetectionStrategy} from '@angular/core'
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms'
import {ContactService} from '@app/_services/api/contact.service'
import {environment} from '@environments/environment'

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ContactComponent implements OnInit {
    formData: UntypedFormGroup
    siteKey: string = environment.siteKey

    constructor(
        private builder: UntypedFormBuilder,
        private contact: ContactService,
        @Inject(TuiNotificationService) private readonly notificationsService: TuiNotificationService
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
                    .open('Your comment have been successfully sent!', {
                        appearance: 'success'
                    }).subscribe()
            }, error => {
                console.warn(error)
                this.notificationsService
                    .open(error, {
                        appearance: 'error'
                    }).subscribe()
            })
    }
}
