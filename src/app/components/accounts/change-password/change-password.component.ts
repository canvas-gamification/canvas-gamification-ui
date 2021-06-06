import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChangePasswordService} from "@app/_services/api/accounts/change-password.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    formData: FormGroup;
    logoPath = 'assets/global/logo.jpg';

    constructor(private builder: FormBuilder, private password: ChangePasswordService, private toastr: ToastrService) {
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
            .subscribe((result) => {
                if (result.success != false) {
                    this.formData.reset();
                    this.toastr.success('Your password has been updated successfully!');
                }

            });
    }

}
