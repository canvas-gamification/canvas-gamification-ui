import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChangePasswordService} from "@app/accounts/_services/change-password.service";
import {ToastrService} from "ngx-toastr";
import {ChangePasswordForm} from "@app/accounts/_forms/change-password.form";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    formGroup: FormGroup;
    logoPath = 'assets/global/logo.jpg';

    constructor(private builder: FormBuilder, private password: ChangePasswordService, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.formGroup = ChangePasswordForm.createForm();
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onSubmit(): void {
        const data = ChangePasswordForm.extractData(this.formGroup);
        this.password.putPasswordReset(data)
            .subscribe((result) => {
                if (result.success != false) {
                    this.formGroup.reset();
                    this.toastr.success('Your password has been updated successfully!');
                }
            });
    }

}
