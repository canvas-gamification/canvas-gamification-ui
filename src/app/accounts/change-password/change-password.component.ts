import { TuiNotificationService } from "@taiga-ui/core";
import {Component, Inject, OnInit, ChangeDetectionStrategy} from '@angular/core'
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms"
import {ChangePasswordService} from "@app/accounts/_services/change-password.service"
import {ChangePasswordForm} from "@app/accounts/_forms/change-password.form"
import {Router} from "@angular/router"

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ChangePasswordComponent implements OnInit {
    formGroup: UntypedFormGroup
    logoPath = 'assets/global/logo.jpg'

    constructor(
        private builder: UntypedFormBuilder,
        private password: ChangePasswordService,
        private router: Router,
        @Inject(TuiNotificationService) private readonly notificationsService: TuiNotificationService
    ) {
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls
    }

    ngOnInit(): void {
        this.formGroup = ChangePasswordForm.createForm()
    }

    onSubmit(): void {
        const data = ChangePasswordForm.extractData(this.formGroup)
        this.password.putPasswordReset(data)
            .subscribe(() => {
                this.router.navigate(['/homepage']).then(() => {
                    this.notificationsService
                        .open('Your password has been updated successfully!', {
                            appearance: 'success'
                        }).subscribe()
                })
            })
    }

}
