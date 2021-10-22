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
    enableNightMode: boolean;
    openUserActions = false;
    openSidebar = false;

    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute) {
        this.authenticationService.currentUser.subscribe(user => {
            this.user = user;
        });

        this.enableNightMode = (window.localStorage.getItem('useNightMode') || 'false') === 'true';
    }

    logout(): void {
        this.authenticationService.logout();
        this.router.navigate(['../../'], {relativeTo: this.route}).then(() => {
            window.location.reload();
        });
    }

    setNightMode(value: boolean): void {
        this.enableNightMode = value;
        window.localStorage.setItem('useNightMode', String(this.enableNightMode));
    }

    isNightMode(): boolean {
        return this.enableNightMode;
    }

    toggleSidebar(open: boolean): void {
        this.openSidebar = open;
    }
}
