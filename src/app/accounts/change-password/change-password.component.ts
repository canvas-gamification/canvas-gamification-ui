import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {ChangePasswordService} from "@app/accounts/_services/change-password.service";
import {ChangePasswordForm} from "@app/accounts/_forms/change-password.form";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";
import {Router} from "@angular/router";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    formGroup: FormGroup;
    logoPath = 'assets/global/logo.jpg';

    constructor(private builder: FormBuilder,
                private password: ChangePasswordService,
                private router: Router,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    ngOnInit(): void {
        this.formGroup = ChangePasswordForm.createForm();
    }

    onSubmit(): void {
        const data = ChangePasswordForm.extractData(this.formGroup);
        this.password.putPasswordReset(data)
            .subscribe(() => {
                this.router.navigate(['/homepage']).then(() => {
                    this.notificationsService
                        .show('Your password has been updated successfully!', {
                            status: TuiNotification.Success
                        }).subscribe();
                });
            });
    }

}
