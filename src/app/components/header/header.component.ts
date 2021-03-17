import {Component, OnInit} from '@angular/core';
import {User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  path: string;
  logoPath = 'assets/global/logo.jpg';

  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    this.authenticationService.currentUser.subscribe(user => {
        this.user = user;
    });
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  isActive(navLink) {
    return window.location.pathname.slice(1) === navLink;
  }
}
