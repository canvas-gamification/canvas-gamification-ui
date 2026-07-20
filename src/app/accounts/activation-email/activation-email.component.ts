import {Component, Inject, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Subscription} from 'rxjs'
import {RegisterService} from '@app/accounts/_services/register.service'
import { TuiAlertService } from "@taiga-ui/core"

@Component({
    selector: 'app-activation-email',
    templateUrl: './activation-email.component.html',
    styleUrls: ['./activation-email.component.scss']
})
export class ActivationEmailComponent implements OnInit {
    uuid: string
    token: string
    private routeSub: Subscription

    constructor(
        private route: ActivatedRoute,
        private registerService: RegisterService,
        private router: Router,
        @Inject(TuiAlertService) private readonly notificationsService: TuiAlertService
    ) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.uuid = params.uuid
            this.token = params.token
        })

        this.registerService.postActivation(this.uuid, this.token).subscribe(
            () => {
                this.notificationsService
                    .open('You have activated your account successfully.', {
                        appearance: 'success'
                    }).subscribe()
                this.router.navigate(['/accounts/login']).then()

            },
            () => {
                this.router.navigate(['accounts', 'login']).then()
            }
        )
    }

}
