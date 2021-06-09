import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {ConsentService} from '@app/accounts/_services/consent.service';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from '@angular/router';
import {ConsentForm} from "@app/accounts/_forms/consent.form";


@Component({
    selector: 'app-consent-form',
    templateUrl: './consent-form.component.html',
    styleUrls: ['./consent-form.component.scss']
})
export class ConsentFormComponent implements OnInit {
    formGroup: FormGroup;
    logoPath = 'assets/global/logo.jpg';

    constructor(private router: Router,
                private route: ActivatedRoute,
                private builder: FormBuilder,
                private consentService: ConsentService,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.formGroup = ConsentForm.createForm();
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    redirectToProfile(): void {
        this.router.navigate(['accounts', 'profile']).then();
    }

    onSubmit(): void {
        const data = ConsentForm.extractData(this.formGroup);
        this.consentService.postConsent(data).subscribe(
            () => {
                this.toastr.success('You have successfully consented!');
                this.redirectToProfile();
            }
        );
    }

    declineConsent(): void {
        this.consentService.declineConsent().subscribe(() => {
            this.toastr.success('You successfully declined to consent.');
            this.redirectToProfile();
        });
    }
}
