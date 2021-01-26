import {Component, OnInit} from '@angular/core';
import {User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: User;
  path: string;

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
}
