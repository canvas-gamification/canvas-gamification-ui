import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConsentService} from '@app/accounts/_services/consent.service';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from '@angular/router';


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
                private toastr: ToastrService) {
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
                this.toastr.success('You have successfully consented!');
            }, error => {
                console.warn(error);
                this.toastr.error(error);
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
            this.toastr.success('You successfully declined to consent.');
        }, error => {
            console.warn(error);
            this.toastr.error(error);
        });
    }

}
