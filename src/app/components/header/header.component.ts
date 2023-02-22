import {Component} from '@angular/core'
import {User} from '@app/_models'
import {AuthenticationService} from '@app/_services/api/authentication'
import {ActivatedRoute, Router} from '@angular/router'
import {NightModeService} from "@app/_services/night-mode.service"

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    user: User
    path: string
    logoPath = 'assets/global/logo.jpg'
    enableNightMode: boolean
    openUserActions = false
    openSidebar = false

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private nightModeService: NightModeService
    ) {
        this.authenticationService.currentUser.subscribe(user => {
            this.user = user
        })
    }

    logout(): void {
        this.authenticationService.logout()
        this.router.navigate(['../../'], {relativeTo: this.route}).then(() => {
            window.location.reload()
        })
    }

    redirectHome(): void {
        this.router.navigate(['/'])
    }

    setNightMode(value: boolean): void {
        this.nightModeService.setNightMode(value)
    }

    isNightMode(): boolean {
        return this.nightModeService.getNightMode()
    }

    toggleSidebar(open: boolean): void {
        this.openSidebar = open
    }
}
