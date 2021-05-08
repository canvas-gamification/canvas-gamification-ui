import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '@environments/environment';
import {RegisterService} from '@app/_services/api/accounts/register.service';
import {MessageService} from '@app/_services/message.service';
import {confirmPasswordValidator} from '@app/_helpers/confirm-password.validator';
import {MESSAGE_TYPES} from '@app/_models';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    formData: FormGroup;
    siteKey: string = environment.siteKey;
    formSubmitted = false;
    isLoading = false;

    constructor(private builder: FormBuilder, private register: RegisterService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.formData = this.builder.group({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required]),
            password2: new FormControl(null, [Validators.required]),
            recaptcha_key: new FormControl(null, [Validators.required])
        }, {
            validators: confirmPasswordValidator,
        });
    }

    get f(): { [p: string]: AbstractControl } {
        return this.formData.controls;
    }

    onSubmit(formData: FormArray): void {
        this.isLoading = true;
        this.register.PostRegistration(formData)
            .subscribe(() => {
                this.formData.reset();
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'You have successfully registered.');
                this.formSubmitted = true;
                this.isLoading = false;
            }, error => {
                console.warn(error);
                this.messageService.add(MESSAGE_TYPES.DANGER, error);
                this.isLoading = false;
            });
    }

}
