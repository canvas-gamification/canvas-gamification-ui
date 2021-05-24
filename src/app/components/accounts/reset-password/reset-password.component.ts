import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from '@app/_services/api/accounts/reset-password.service';
import {ToastrService} from "ngx-toastr";


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
    formData: FormGroup;
    logoPath = 'assets/global/logo.jpg';

    constructor(private builder: FormBuilder, private password: ResetPasswordService, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.formData = this.builder.group({
            old_password: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            password2: new FormControl('', [Validators.required])
        });
    }

    onSubmit(formData: FormGroup): void {
        this.password.putPasswordReset(formData.value)
            .subscribe(() => {
                this.formData.reset();
                this.toastr.success('Your password has been updated successfully!');
            }, error => {
                console.warn(error);
                this.toastr.error(error);
            });
    }

}
