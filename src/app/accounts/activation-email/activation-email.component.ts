import {Component, Inject, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Subscription} from 'rxjs'
import {RegisterService} from '@app/accounts/_services/register.service'
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"

@Component({
    selector: 'app-activation-email',
    templateUrl: './activation-email.component.html',
    styleUrls: ['./activation-email.component.scss']
})
export class ActivationEmailComponent implements OnInit {
    uuid: string
    token: string
    private routeSub: Subscription

    constructor(private route: ActivatedRoute,
                private registerService: RegisterService,
                private router: Router,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.uuid = params.uuid
            this.token = params.token
        })

        this.registerService.postActivation(this.uuid, this.token).subscribe(
            () => {
                this.notificationsService
                    .show('You have activated your account successfully.', {
                        status: TuiNotification.Success
                    }).subscribe()
                this.router.navigate(['/accounts/login']).then()

            },
            () => {
                this.router.navigate(['accounts', 'login']).then()
            }
        )
    }

}
