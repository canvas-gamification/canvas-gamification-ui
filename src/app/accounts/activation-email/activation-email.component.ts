import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RegisterService} from '@app/accounts/_services/register.service';

import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-activation-email',
    templateUrl: './activation-email.component.html',
    styleUrls: ['./activation-email.component.scss']
})
export class ActivationEmailComponent implements OnInit {
    private routeSub: Subscription;
    uuid: string;
    token: string;

    constructor(private route: ActivatedRoute,
                private registerService: RegisterService,
                private toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.uuid = params.uuid;
            this.token = params.token;
        });

        this.registerService.postActivation(this.uuid, this.token)
            .subscribe((result) => {
                if (result.success) {
                    this.toastr.success('You have activated your account successfully.');
                    this.router.navigate(['/accounts/login']).then();
                }
            });
    }

}
