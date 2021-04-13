import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '@app/_services/api/contact.service';
import {MessageService} from '@app/_services/message.service';
import {environment} from '@environments/environment';
import {MESSAGE_TYPES} from '@app/_models';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    FormData: FormGroup;
    siteKey: string = environment.siteKey;

    constructor(private builder: FormBuilder, private contact: ContactService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.FormData = this.builder.group({
            fullname: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
            comment: new FormControl('', [Validators.required]),
            recaptcha_key: new FormControl(null, [Validators.required])
        });
    }

    onSubmit(FormData) {
        this.contact.PostMessage(FormData)
            .subscribe(response => {
                this.FormData.reset();
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'Your comment have been successfully sent!');
            }, error => {
                console.warn(error.responseText);
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
            });
    }
}
