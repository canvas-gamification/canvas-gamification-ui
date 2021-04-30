import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '@environments/environment';
import {RegisterService} from '@app/_services/api/accounts/register.service';
import {MessageService} from '@app/_services/message.service';
import {ConfirmPasswordValidator} from '@app/_helpers/confirm-password.validator';
import {MESSAGE_TYPES} from '@app/_models';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    FormData: FormGroup;
    siteKey: string = environment.siteKey;
    formSubmitted: boolean = false;

    constructor(private builder: FormBuilder, private register: RegisterService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.FormData = this.builder.group({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required]),
            password2: new FormControl(null, [Validators.required]),
            recaptcha_key: new FormControl(null, [Validators.required])
        }, {
            validator: ConfirmPasswordValidator('password', 'password2')
        });
    }

    get f() {
        return this.FormData.controls;
    }

    onSubmit(FormData: FormArray) {
        this.register.PostRegistration(FormData)
            .subscribe(response => {
                this.FormData.reset();
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'You have successfully registered.');
                this.formSubmitted = true;
            }, error => {
                console.warn(error.responseText);
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
            });
    }

}
