import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RegisterService} from '@app/_services/api/accounts/register.service';
import {MESSAGE_TYPES} from '@app/_models';
import {MessageService} from '@app/_services/message.service';

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
                private messageService: MessageService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.uuid = params.uuid;
            this.token = params.token;
        });

        this.registerService.PostActivation(this.uuid, this.token)
            .subscribe(response => {
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'You have activated your account successfully.');
                this.router.navigate(['/accounts/consent-form']);
            }, error => {
                this.messageService.add(MESSAGE_TYPES.DANGER, error);
                this.router.navigate(['/accounts/login']);
            });
    }

}
