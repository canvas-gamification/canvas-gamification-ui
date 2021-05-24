import {Component} from '@angular/core';
import {User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    user: User;
    path: string;
    logoPath = 'assets/global/logo.jpg';

    constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
        this.authenticationService.currentUser.subscribe(user => {
            this.user = user;
        });
    }

    logout(): void {
        this.authenticationService.logout();
        this.router.navigate(['../../'], {relativeTo: this.route}).then();
    }

    isActive(navLink: string): boolean {
        return window.location.pathname.slice(1) === navLink;
    }
}
