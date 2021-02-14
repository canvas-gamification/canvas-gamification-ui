import {Component, OnInit} from '@angular/core';
import {User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  path: string;
  logoPath = 'assets/global/logo.jpg';

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authenticationService.logout();
  }

  isLoggedIn() {
    return !!this.authenticationService.currentUserValue;
  }

  isActive(navLink) {
    return window.location.pathname.slice(1) === navLink;
  }

  isTeacher() {
    // TODO: is this user a teacher?
    return true;
  }

  hasCompleteProfile() {
    // TODO: does this user have a saved firstName, i.e. is their profile complete
    return true;
  }

  getUserTokens() {
    // TODO: retrieve the number of tokens this user has
    return 220;
  }

  isAdmin() {
    // TODO: is this user an admin? or staff?
    return true;
  }
}
