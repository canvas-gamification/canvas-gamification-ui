import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConsentService} from '@app/_services/api/accounts/consent.service';
import {MessageService} from '@app/_services/message.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MESSAGE_TYPES} from '@app/_models';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-consent-form',
    templateUrl: './consent-form.component.html',
    styleUrls: ['./consent-form.component.scss']
})
export class ConsentFormComponent implements OnInit {
    FormData: FormGroup;
    currentDate: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private builder: FormBuilder,
                private consentService: ConsentService,
                private messageService: MessageService,
                private datePipe: DatePipe) {
    }

    ngOnInit(): void {
        this.currentDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
        this.FormData = this.builder.group({
            consent: true,
            legal_first_name: new FormControl('', [Validators.required]),
            legal_last_name: new FormControl('', [Validators.required]),
            student_number: new FormControl('', [Validators.required]),
            date: new FormControl(this.currentDate, [Validators.required])
        });
    }

    onSubmit(FormData) {
        this.consentService.postConsent(FormData)
            .subscribe(response => {
                this.router.navigate(['../profile'], {relativeTo: this.route});
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'You have successfully consented!');
                window.scroll(0, 0);
            }, error => {
                console.warn(error.responseText);
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
                window.scroll(0, 0);
            });
    }

    declineConsent() {
        this.consentService.postConsent({
            consent: false,
            legal_first_name: '',
            legal_last_name: '',
            student_number: '',
            date: ''
        }).subscribe(response => {
            this.messageService.add(MESSAGE_TYPES.SUCCESS, 'You successfully declined to consent.');
        }, error => {
            console.warn(error);
            this.messageService.add(MESSAGE_TYPES.DANGER, error);
        });
    }

}
