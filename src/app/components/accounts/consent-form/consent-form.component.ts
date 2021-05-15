import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConsentService} from '@app/_services/api/accounts/consent.service';
import {MessageService} from '@app/_services/message.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MESSAGE_TYPES} from '@app/_models';

@Component({
    selector: 'app-consent-form',
    templateUrl: './consent-form.component.html',
    styleUrls: ['./consent-form.component.scss']
})
export class ConsentFormComponent implements OnInit {
    formData: FormGroup;
    logoPath = 'assets/global/logo.jpg';

    constructor(private router: Router,
                private route: ActivatedRoute,
                private builder: FormBuilder,
                private consentService: ConsentService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.formData = this.builder.group({
            consent: true,
            legal_first_name: new FormControl('', [Validators.required]),
            legal_last_name: new FormControl('', [Validators.required]),
            student_number: new FormControl('', [Validators.required]),
            date: new FormControl(new Date().toDateString(), [Validators.required])
        });
    }

    onSubmit(formData: FormGroup): void {
        this.consentService.postConsent(formData.value)
            .subscribe(() => {
                this.router.navigate(['../profile'], {relativeTo: this.route}).then();
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'You have successfully consented!');
                window.scroll(0, 0);
            }, error => {
                console.warn(error.responseText);
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
                window.scroll(0, 0);
            });
    }

    declineConsent(): void {
        this.consentService.postConsent({
            consent: false,
            legal_first_name: '',
            legal_last_name: '',
            student_number: '',
            date: ''
        }).subscribe(() => {
            this.messageService.add(MESSAGE_TYPES.SUCCESS, 'You successfully declined to consent.');
        }, error => {
            console.warn(error);
            this.messageService.add(MESSAGE_TYPES.DANGER, error);
        });
    }

}
