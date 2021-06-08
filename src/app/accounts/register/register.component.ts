import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {environment} from '@environments/environment';
import {RegisterService} from '@app/accounts/_services/register.service';
import {ToastrService} from "ngx-toastr";
import {RegisterForm} from "@app/accounts/_forms/register.form";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    formGroup: FormGroup;
    siteKey = environment.siteKey;
    formSubmitted = false;
    isLoading = false;
    logoPath = 'assets/global/logo.jpg';

    constructor(private register: RegisterService, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.formGroup = RegisterForm.createForm();
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onSubmit(): void {
        const data = RegisterForm.extractData(this.formGroup);
        this.isLoading = true;
        console.log(data);
        this.register.postRegistration(data)
            .subscribe(() => {
                this.formGroup.reset();
                this.toastr.success('You have successfully registered.');
                this.formSubmitted = true;
                this.isLoading = false;
            },
            (error) => {
                this.toastr.error(JSON.stringify(error.error));
                this.isLoading = false;
            });
    }

}
