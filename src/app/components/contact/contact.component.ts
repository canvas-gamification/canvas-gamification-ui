import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '@app/_services/api/contact.service';
import {ToastrService} from "ngx-toastr";
import {environment} from '@environments/environment';


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    formData: FormGroup;
    siteKey: string = environment.siteKey;

    constructor(private builder: FormBuilder, private contact: ContactService, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.formData = this.builder.group({
            fullname: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
            comment: new FormControl('', [Validators.required]),
            recaptcha_key: new FormControl(null, [Validators.required])
        });
    }

    onSubmit(formData: { fullname: string, email: string, comment: string, recaptcha_key: string }): void {
        this.contact.postMessage(formData)
            .subscribe(() => {
                this.formData.reset();
                this.toastr.success('Your comment have been successfully sent!');
            }, error => {
                console.warn(error.responseText);
                this.toastr.error(error.responseText);
            });
    }
}
